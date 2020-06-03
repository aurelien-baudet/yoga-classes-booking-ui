import { BookingHelperComponent } from './../../components/booking-helper/booking-helper.component';
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
export class ScheduledClassDetailsPage implements OnInit {
  private currentUser: User | UnregisteredUser;
  private bookedClassesForCurrentUser: ScheduledClass[] = [];
  protected lastClick: Event;

  @ViewChild('placeDetails', { static: true })
  private placeDetails: TemplateRef<any>;
  @ViewChild('bookingHelper', { static: true })
  private bookingHelper: BookingHelperComponent;

  scheduledClass: ScheduledClass;
  scheduledClassId: string;

  bookingStateProvider: BookingStateProvider;
  detailsProvider: DetailsStateProvider<ScheduledClass> & DetailsStateUpdateProvider<ScheduledClass>;
  pendingProvider: PendingStateProvider<ScheduledClass> & PendingStateUpdateProvider<ScheduledClass>;
  manageClassStateProvider: ManageClassStateProvider;
  searchFriendProvider: AutoCompleteService;

  constructor(private classService: ClassService,
              private accountService: AccountService,
              private bookingService: BookingService,
              private route: CurrentRoute,
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
    if (this.bookingHelper) {
      this.bookingHelper.finishBookingIfNecessary();
      this.bookingHelper.finishUnbookingIfNecessary();
    }
  }

  ngOnInit() {
    // first time, bookingHelper not yet created so ionViewDidEnter won't be able to call it
    // => trigger once Angular has created the component the first time
    // once the page is created, ngOnInit is never called again
    // => ionViewDidEnter will be used next times
    this.bookingHelper.finishBookingIfNecessary();
    this.bookingHelper.finishUnbookingIfNecessary();
  }


  async showPlaceDetails(place: Place) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.placeDetails, {place}, {cssClass: 'place-details'});
    }, 0);
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

  async refreshDetailsAndBooking() {
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
