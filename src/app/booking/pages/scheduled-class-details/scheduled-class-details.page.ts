import { isUnknown } from 'src/app/account/domain/user';
import { ComingSoonFriendProvider } from './../../services/local/coming-soon-friend.provider';
import { UnmanageableProvider } from './../../services/local/unmanageable.provider';
import { InMemoryUpdatablePendingStateProvider } from './../../services/local/in-memory-pending-state.provider';
import { InMemoryUpdatableDetailsStateProvider } from 'src/app/booking/services/local/in-memory-details-class-state.provider';
import { BookedClassesBookingStateProvider } from './../../services/local/booked-classes-booking-state.provider';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { BookingStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, PendingStateProvider, PendingStateUpdateProvider, ManageClassStateProvider } from 'src/app/booking/services/single-class-state.provider';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { User } from './../../../account/domain/user';
import { ApplicationEventService } from './../../../common/services/application-event.service';
import { CurrentRoute } from './../../../common/util/router.util';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/booking/services/booking.service';
import { AccountService } from 'src/app/account/services/account.service';
import { ClassService } from 'src/app/booking/services/class.service';
import { ScheduledClass, Place, BookingForFriend, UnbookingForFriend, sameClassPredicate } from 'src/app/booking/domain/reservation';
import { Component, OnInit, NgZone, ViewChild, TemplateRef } from '@angular/core';
import { NotificationService } from 'src/app/common/components/notification/notification.service';
import { PopoverService } from 'src/app/common/components/popover/popover.service';

@Component({
  selector: 'app-scheduled-class-details',
  templateUrl: './scheduled-class-details.page.html',
  styleUrls: ['./scheduled-class-details.page.scss'],
})
export class ScheduledClassDetailsPage {
  private currentUser: User | UnregisteredUser;
  private bookedClassesForCurrentUser: ScheduledClass[] = [];
  protected lastClick: Event;
  private scheduledClassId: string;

  @ViewChild('placeDetails')
  placeDetails: TemplateRef<any>;
  @ViewChild('approvedNotification')
  approvedNotification: TemplateRef<any>;
  @ViewChild('waitingListNotification')
  waitingListNotification: TemplateRef<any>;
  @ViewChild('unbookedNotification')
  unbookedNotification: TemplateRef<any>;

  scheduledClass: ScheduledClass;

  bookingStateProvider: BookingStateProvider;
  detailsProvider: DetailsStateProvider<ScheduledClass> & DetailsStateUpdateProvider<ScheduledClass>;
  pendingProvider: PendingStateProvider<ScheduledClass> & PendingStateUpdateProvider<ScheduledClass>;
  manageClassStateProvider: ManageClassStateProvider;
  searchFriendProvider: AutoCompleteService;

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
      zone.run(() => this.refreshDetailsAndBooking());
    });
  }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
    this.scheduledClassId = this.route.getPathParam('classId');
    this.refreshDetailsAndBooking();
    this.finishBookingIfNecessary();
    this.finishUnbookingIfNecessary();
  }

  async book(bookedClass: ScheduledClass) {
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
    this.router.navigate(['classes', this.scheduledClassId], {queryParams: {}});
    this.refreshDetailsAndBooking();
  }

  async unbook(bookedClass: ScheduledClass) {
    if (isUnknown(this.currentUser)) {
      console.log('unknown user so ask who he is before unbooking');
      return this.authenticateForUnbooking(bookedClass);
    }
    this.pendingProvider.markPending(bookedClass);
    // TODO: handle case when user registers another user
    await this.bookingService.unbook(this.currentUser, bookedClass);
    this.pendingProvider.unmarkPending(bookedClass);
    this.notificationService.success(this.unbookedNotification, {bookedClass});
    this.router.navigate(['classes', this.scheduledClassId], {queryParams: {}});
    this.refreshDetailsAndBooking();
  }

  async showPlaceDetails(place: Place) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.placeDetails, {place}/*, this.lastClick*/);
    }, 0);
  }

  async bookForFriend(booking: BookingForFriend) {
    alert('Bientôt disponible');
  }

  async unbookForFriend(unbooking: UnbookingForFriend) {
    alert('Bientôt disponible');
  }

  isBookable(scheduledClass: ScheduledClass) {
    return this.bookingStateProvider.isBookable(scheduledClass)
      && !this.bookingStateProvider.isBooked(scheduledClass)
      && !this.pendingProvider.isPending(scheduledClass);
  }

  isUnbookable(scheduledClass: ScheduledClass) {
    return this.bookingStateProvider.isBookable(scheduledClass)
      && this.bookingStateProvider.isBooked(scheduledClass)
      && !this.pendingProvider.isPending(scheduledClass);
  }

  isPending(scheduledClass: ScheduledClass) {
    return this.bookingStateProvider.isBookable(scheduledClass)
      && this.pendingProvider.isPending(scheduledClass);
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

  private async finishBookingIfNecessary() {
    const bookingId = this.route.getQueryParam('booking');
    if (bookingId) {
      const bookedClass = await this.classService.getClassInfo({id: bookingId});
      await this.book(bookedClass);
      this.router.navigate(['classes', this.scheduledClassId]);
    }
  }

  private async finishUnbookingIfNecessary() {
    const unbookingId = this.route.getQueryParam('unbooking');
    if (unbookingId) {
      const bookedClass = await this.classService.getClassInfo({id: unbookingId});
      await this.unbook(bookedClass);
      this.router.navigate(['classes', this.scheduledClassId]);
    }
  }

  private async refreshDetailsAndBooking() {
    this.refreshClass();
    this.refreshBookings();
  }

  private async refreshClass() {
    this.scheduledClass = await this.classService.getClassInfo({id: this.scheduledClassId});
  }

  private async updateCurrentUser(user: User | UnregisteredUser | null) {
    this.currentUser = user;
    this.refreshBookings();
  }

  private async refreshBookings() {
    const bookings = await this.bookingService.getBookedClasses(this.currentUser);
    this.bookedClassesForCurrentUser.splice(0, this.bookedClassesForCurrentUser.length);
    this.bookedClassesForCurrentUser.push(...bookings);
  }
}
