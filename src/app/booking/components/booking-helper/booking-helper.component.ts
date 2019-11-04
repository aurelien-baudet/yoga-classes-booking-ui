import { CalendarService } from 'src/app/common/services/calendar.service';
import { ApplicationEventService } from './../../../common/services/application-event.service';
import { CurrentRoute } from './../../../common/util/router.util';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/booking/services/booking.service';
import { AccountService } from 'src/app/account/services/account.service';
import { ClassService } from 'src/app/booking/services/class.service';
import { User } from './../../../account/domain/user';
import { BookingForFriend, UnbookingForFriend } from 'src/app/booking/domain/reservation';
import { Component, TemplateRef, ViewChild, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { ScheduledClass } from '../../domain/reservation';
import { isUnknown } from 'src/app/account/domain/user';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { matchesErrorCode } from '../../domain/general';
import { NotificationService } from 'src/app/common/components/notification/notification.service';
import { PendingStateProvider, PendingStateUpdateProvider } from '../../services/single-class-state.provider';


@Component({
  selector: 'app-booking-helper',
  templateUrl: './booking-helper.component.html',
  styleUrls: ['./booking-helper.component.scss'],
})
export class BookingHelperComponent {
  @Input()
  redirection: any[];
  @Input()
  pendingProvider: PendingStateUpdateProvider<ScheduledClass>;

  @Output()
  refresh = new EventEmitter<void>();


  private currentUser: User | UnregisteredUser;

  @ViewChild('approvedNotification')
  private approvedNotification: TemplateRef<any>;
  @ViewChild('waitingListNotification')
  private waitingListNotification: TemplateRef<any>;
  @ViewChild('unbookedNotification')
  private unbookedNotification: TemplateRef<any>;
  @ViewChild('alreadyBookedNotification')
  private alreadyBookedNotification: TemplateRef<any>;
  @ViewChild('notBookedNotification')
  private notBookedNotification: TemplateRef<any>;

  constructor(private classService: ClassService,
              private bookingService: BookingService,
              private router: Router,
              private route: CurrentRoute,
              private notificationService: NotificationService,
              private calendarService: CalendarService,
              accountService: AccountService) {
    accountService.currentUser$.subscribe((u) => this.currentUser = u);
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
      this.router.navigate(this.redirection, {queryParams: {}});
      this.refresh.emit();
    } catch (e) {
      if (matchesErrorCode(e, 'ALREADY_BOOKED')) {
        this.pendingProvider.unmarkPending(bookedClass);
        this.notificationService.warn(this.alreadyBookedNotification, {bookedClass});
        this.router.navigate(this.redirection, {queryParams: {}});
        this.refresh.emit();
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
      this.router.navigate(this.redirection, {queryParams: {}});
      this.refresh.emit();
    } catch (e) {
      if (matchesErrorCode(e, 'NOT_BOOKED')) {
        this.pendingProvider.unmarkPending(bookedClass);
        this.notificationService.warn(this.notBookedNotification, {bookedClass});
        this.router.navigate(this.redirection, {queryParams: {}});
        this.refresh.emit();
        return;
      }
      throw e;
    }
  }

  async bookForFriend(booking: BookingForFriend) {
    alert('Bientôt disponible');
  }

  async unbookForFriend(unbooking: UnbookingForFriend) {
    alert('Bientôt disponible');
  }


  private authenticateForBooking(bookedClass: ScheduledClass) {
    this.router.navigate(['users', 'whoareyou'], {
      queryParams: {
        returnUrl: `${this.route.url()}?booking=${bookedClass.id}`
      }
    });
  }

  private authenticateForUnbooking(bookedClass: ScheduledClass) {
    this.router.navigate(['users', 'whoareyou'], {
      queryParams: {
        returnUrl: `${this.route.url()}?unbooking=${bookedClass.id}`
      }
    });
  }

  async addToCalendar(bookedClass: ScheduledClass) {
    try {
      await this.calendarService.addReminderForClass(bookedClass);
      // TODO: feedback ?
    } catch (e) {
      // TODO: indicate that event couldn't be added (or maybe try to add it interactively instead)
      console.error('Failed to add reminder to calendar', e);
    }
  }

  async removeFromCalendar(bookedClass: ScheduledClass) {
    await this.calendarService.removeReminderForClass(bookedClass);
  }

  async finishBookingIfNecessary() {
    const bookingId = this.route.getQueryParam('booking');
    if (bookingId) {
      const bookedClass = await this.classService.getClassInfo({id: bookingId});
      await this.book(bookedClass);
      this.router.navigate(this.redirection);
    }
  }

  async finishUnbookingIfNecessary() {
    const unbookingId = this.route.getQueryParam('unbooking');
    if (unbookingId) {
      const bookedClass = await this.classService.getClassInfo({id: unbookingId});
      await this.unbook(bookedClass);
      this.router.navigate(this.redirection);
    }
  }
}
