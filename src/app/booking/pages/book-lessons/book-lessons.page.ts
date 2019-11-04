import { matchesErrorCode } from './../../domain/general';
import { ComingSoonFriendProvider } from './../../services/local/coming-soon-friend.provider';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { Place, BookingForFriend, UnbookingForFriend } from 'src/app/booking/domain/reservation';
import { InMemoryUpdatableDetailsStateProvider } from '../../services/local/in-memory-details-class-state.provider';
import { UnmanageableProvider } from './../../services/local/unmanageable.provider';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { NotificationService } from './../../../common/components/notification/notification.service';
import { Router } from '@angular/router';
import { User, isUnknown, UserInfo } from 'src/app/account/domain/user';
import { AccountService } from './../../../account/services/account.service';
import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';
import { ClassService } from '../../services/class.service';
import { Component, TemplateRef, ViewChild, NgZone } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { BookingStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, PendingStateProvider, PendingStateUpdateProvider, ManageClassStateProvider } from '../../services/single-class-state.provider';
import { InMemoryUpdatablePendingStateProvider } from '../../services/local/in-memory-pending-state.provider';
import { BookedClassesBookingStateProvider } from '../../services/local/booked-classes-booking-state.provider';
import { PopoverService, PopoverWrapper } from 'src/app/common/components/popover/popover.service';
import { PushNotificationHandlerService } from 'src/app/common/services/push-notification-handler.service';
import { ApplicationEventService } from 'src/app/common/services/application-event.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-book-lessons-page',
  templateUrl: './book-lessons.page.html',
  styleUrls: ['./book-lessons.page.scss'],
})
export class BookLessonsPage {
  private currentUser: User | UnregisteredUser;
  private bookedClassesForCurrentUser: ScheduledClass[] = [];
  protected lastClick: Event;

  @ViewChild(IonContent)
  content: IonContent;
  @ViewChild('placeDetails')
  placeDetails: TemplateRef<any>;
  @ViewChild('approvedNotification')
  approvedNotification: TemplateRef<any>;
  @ViewChild('waitingListNotification')
  waitingListNotification: TemplateRef<any>;
  @ViewChild('unbookedNotification')
  unbookedNotification: TemplateRef<any>;
  @ViewChild('approvedStudents')
  approvedStudents: TemplateRef<any>;
  @ViewChild('waitingStudents')
  waitingStudents: TemplateRef<any>;
  @ViewChild('alreadyBookedNotification')
  alreadyBookedNotification: TemplateRef<any>;
  @ViewChild('notBookedNotification')
  notBookedNotification: TemplateRef<any>;

  bookingStateProvider: BookingStateProvider;
  detailsProvider: DetailsStateProvider<ScheduledClass> & DetailsStateUpdateProvider<ScheduledClass>;
  pendingProvider: PendingStateProvider<ScheduledClass> & PendingStateUpdateProvider<ScheduledClass>;
  manageClassStateProvider: ManageClassStateProvider;
  searchFriendProvider: AutoCompleteService;

  classes: ScheduledClass[];
  loading = true;

  constructor(private classService: ClassService,
              private accountService: AccountService,
              private bookingService: BookingService,
              private router: Router,
              private route: CurrentRoute,
              private notificationService: NotificationService,
              private popoverService: PopoverService,
              applicationEventService: ApplicationEventService,
              zone: NgZone) {
    this.bookingStateProvider = new BookedClassesBookingStateProvider(this.bookedClassesForCurrentUser, accountService.currentUser$);
    this.detailsProvider = new InMemoryUpdatableDetailsStateProvider(sameClassPredicate);
    this.pendingProvider = new InMemoryUpdatablePendingStateProvider(sameClassPredicate);
    this.manageClassStateProvider = new UnmanageableProvider();
    this.searchFriendProvider = new ComingSoonFriendProvider();
    this.accountService.currentUser$.subscribe(this.updateCurrentUser.bind(this));
    applicationEventService.refreshBookings.subscribe(() => {
      zone.run(() => this.refreshClassesAndBookings());
    });
  }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
    this.refreshClassesAndBookings();
    this.finishBookingIfNecessary();
    this.finishUnbookingIfNecessary();
  }

  async book(bookedClass: ScheduledClass) {
    try {
      if (isUnknown(this.currentUser)) {
        console.log('unknown user so ask who he is before booking');
        return this.authenticateForBooking(bookedClass);
      }
      this.pendingProvider.markPending(bookedClass);
      // TODO: handle case when user registers another user
      const booked = await this.bookingService.book(this.currentUser, bookedClass);
      this.pendingProvider.unmarkPending(bookedClass);
      const template = booked.approved ? this.approvedNotification : this.waitingListNotification;
      this.notificationService.success(template, booked);
      this.router.navigate(['lessons'], {queryParams: {}});
      await this.refreshClassesAndBookings();
      this.scrollTo(bookedClass);
    } catch (e) {
      if (matchesErrorCode(e, 'ALREADY_BOOKED')) {
        this.pendingProvider.unmarkPending(bookedClass);
        this.notificationService.warn(this.alreadyBookedNotification, {bookedClass});
        this.router.navigate(['lessons'], {queryParams: {}});
        await this.refreshClassesAndBookings();
        this.scrollTo(bookedClass);
        return;
      }
      throw e;
    }
  }

  async unbook(bookedClass: ScheduledClass) {
    try {
      if (isUnknown(this.currentUser)) {
        console.log('unknown user so ask who he is before unbooking');
        return this.authenticateForUnbooking(bookedClass);
      }
      this.pendingProvider.markPending(bookedClass);
      // TODO: handle case when user registers another user
      await this.bookingService.unbook(this.currentUser, bookedClass);
      this.pendingProvider.unmarkPending(bookedClass);
      this.notificationService.success(this.unbookedNotification, {bookedClass});
      this.router.navigate(['lessons'], {queryParams: {}});
      await this.refreshClassesAndBookings();
      this.scrollTo(bookedClass);
    } catch (e) {
      if (matchesErrorCode(e, 'NOT_BOOKED')) {
        this.pendingProvider.unmarkPending(bookedClass);
        this.notificationService.warn(this.notBookedNotification, {bookedClass});
        this.router.navigate(['lessons'], {queryParams: {}});
        await this.refreshClassesAndBookings();
        this.scrollTo(bookedClass);
        return;
      }
      throw e;
    }
  }

  async showPlaceDetails(place: Place) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.placeDetails, {place}/*, this.lastClick*/);
    }, 0);
  }

  async showClassDetails(scheduledClass: ScheduledClass) {
    this.router.navigate(['classes', scheduledClass.id]);
  }

  async showApprovedStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.approvedStudents, {scheduledClass}, this.lastClick);
    }, 0);
  }

  async showWaitingStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.waitingStudents, {scheduledClass}, this.lastClick);
    }, 0);
  }

  async bookForFriend(booking: BookingForFriend) {
    alert('Bientôt disponible');
  }

  async unbookForFriend(unbooking: UnbookingForFriend) {
    alert('Bientôt disponible');
  }

  isMobileApp() {
    // TODO
    return true;
  }

  addToCalendar(bookedClass: ScheduledClass) {
    // TODO
    alert('Bientôt disponible');
  }

  removeFromCalendar(bookedClass: ScheduledClass) {
    // TODO
    alert('Bientôt disponible');
  }

  async manualRefresh(event: any) {
    await this.refreshClassesAndBookings();
    event.target.complete();
  }

  private updateCurrentUser(user: User | UnregisteredUser | null) {
    this.currentUser = user;
    this.refreshBookings();
  }

  private authenticateForBooking(bookedClass: ScheduledClass) {
    this.router.navigate(['users', 'whoareyou'], {
      queryParams: {
        booking: bookedClass.id
      }
    });
  }

  private authenticateForUnbooking(bookedClass: ScheduledClass) {
    this.router.navigate(['users', 'whoareyou'], {
      queryParams: {
        unbooking: bookedClass.id
      }
    });
  }

  private async refreshClasses() {
    this.classes = await this.classService.list();
  }

  private async refreshBookings() {
    const bookings = await this.bookingService.getBookedClasses(this.currentUser);
    this.bookedClassesForCurrentUser.splice(0, this.bookedClassesForCurrentUser.length);
    this.bookedClassesForCurrentUser.push(...bookings);
  }

  async refreshClassesAndBookings() {
    this.loading = true;
    await this.refreshClasses();
    await this.refreshBookings();
    this.loading = false;
  }

  private async finishBookingIfNecessary() {
    const bookingId = this.route.getQueryParam('booking');
    if (bookingId) {
      const bookedClass = await this.classService.getClassInfo({id: bookingId});
      await this.book(bookedClass);
      this.router.navigate(['']);
    }
  }

  private async finishUnbookingIfNecessary() {
    const unbookingId = this.route.getQueryParam('unbooking');
    if (unbookingId) {
      const bookedClass = await this.classService.getClassInfo({id: unbookingId});
      await this.unbook(bookedClass);
      this.router.navigate(['']);
    }
  }

  private async scrollTo(scheduledClass: ScheduledClass) {
    setTimeout(() => {
      const yOffset = document.getElementById(`scheduled-class-${scheduledClass.id}`).offsetTop;
      this.content.scrollToPoint(0, yOffset);
    }, 0);
  }
}
