import { CanUnbookOwnBookingUnbookableProvider } from './../../services/local/can-unbook-own-booking.provider';
import { StudentListUnbookableStateProvider } from 'src/app/booking/services/student-list-unbookable-state.provider';
import { BookingHelperComponent } from './../../components/booking-helper/booking-helper.component';
import { ComingSoonFriendProvider } from './../../services/local/coming-soon-friend.provider';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { Place, BookingForFriend, UnbookingForFriend } from 'src/app/booking/domain/reservation';
import { InMemoryUpdatableDetailsStateProvider } from '../../services/local/in-memory-details-class-state.provider';
import { UnmanageableProvider } from './../../services/local/unmanageable.provider';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { NotificationService } from './../../../common/components/notification/notification.service';
import { Router } from '@angular/router';
import { User } from 'src/app/account/domain/user';
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
import { ApplicationEventService } from 'src/app/common/services/application-event.service';


@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.page.html',
  styleUrls: ['./user-bookings.page.scss'],
})
export class UserBookingsPage {
  private currentUser: User | UnregisteredUser;
  protected lastClick: Event;

  @ViewChild('placeDetails', { static: true })
  private placeDetails: TemplateRef<any>;
  @ViewChild('approvedStudents', { static: true })
  private approvedStudents: TemplateRef<any>;
  @ViewChild('waitingStudents', { static: true })
  private waitingStudents: TemplateRef<any>;
  @ViewChild('bookingHelper', { static: true })
  private bookingHelper: BookingHelperComponent;

  bookingStateProvider: BookingStateProvider;
  detailsProvider: DetailsStateProvider<ScheduledClass> & DetailsStateUpdateProvider<ScheduledClass>;
  pendingProvider: PendingStateProvider<ScheduledClass> & PendingStateUpdateProvider<ScheduledClass>;
  manageClassStateProvider: ManageClassStateProvider;
  searchFriendProvider: AutoCompleteService;
  unbookableProvider: StudentListUnbookableStateProvider;

  bookedClassesForCurrentUser: ScheduledClass[] = [];

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
    this.unbookableProvider = new CanUnbookOwnBookingUnbookableProvider(this.accountService.currentUser$);
    this.accountService.currentUser$.subscribe(this.updateCurrentUser.bind(this));
    applicationEventService.refreshBookings.subscribe(() => {
      zone.run(() => this.refreshBookings());
    });
  }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
    this.refreshBookings();
  }


  async unbook(bookedClass: ScheduledClass) {
    await this.bookingHelper.unbook(bookedClass);
  }

  async confirmBooking(bookedClass: ScheduledClass) {
    await this.bookingHelper.confirmBooking(bookedClass);
  }

  async showPlaceDetails(place: Place) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.placeDetails, {place}, {cssClass: 'place-details'});
    }, 0);
  }

  async showClassDetails(scheduledClass: ScheduledClass) {
    this.router.navigate(['classes', scheduledClass.id]);
  }

  async showApprovedStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.approvedStudents, {scheduledClass}, {cssClass: 'approved-students'});
   }, 0);
  }

  async showWaitingStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.waitingStudents, {scheduledClass}, {cssClass: 'waiting-students'});
    }, 0);
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

  private updateCurrentUser(user: User | UnregisteredUser | null) {
    this.currentUser = user;
    this.refreshBookings();
  }

  async refreshBookings() {
    const bookings = await this.bookingService.getBookedClasses(this.currentUser);
    this.bookedClassesForCurrentUser.splice(0, this.bookedClassesForCurrentUser.length);
    this.bookedClassesForCurrentUser.push(...bookings);
  }
}
