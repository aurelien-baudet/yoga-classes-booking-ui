import { InMemoryUpdatableDetailsStateProvider } from '../../services/local/in-memory-details-class-state.provider';
import { UnmanageableProvider } from './../../services/local/unmanageable.provider';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { NotificationService } from './../../../common/components/notification/notification.service';
import { Router } from '@angular/router';
import { User, isUnkown as isUnknown } from 'src/app/account/domain/user';
import { AccountService } from './../../../account/services/account.service';
import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';
import { ClassService } from '../../services/class.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { BookingStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, PendingStateProvider, PendingStateUpdateProvider, ManageClassStateProvider } from '../../services/single-class-state.provider';
import { InMemoryUpdatablePendingStateProvider } from '../../services/local/in-memory-pending-state.provider';
import { BookedClassesBookingStateProvider } from '../../services/local/booked-classes-booking-state.provider';

@Component({
  selector: 'app-book-lessons-page',
  templateUrl: './book-lessons.page.html',
  styleUrls: ['./book-lessons.page.scss'],
})
export class BookLessonsPage {
  private currentUser: User | UnregisteredUser;
  private bookedClassesForCurrentUser: ScheduledClass[] = [];

  @ViewChild('approvedNotification')
  approvedNotification: TemplateRef<any>;
  @ViewChild('waitingListNotification')
  waitingListNotification: TemplateRef<any>;
  @ViewChild('canceledNotification')
  canceledNotification: TemplateRef<any>;

  bookingStateProvider: BookingStateProvider;
  detailsProvider: DetailsStateProvider<ScheduledClass> & DetailsStateUpdateProvider<ScheduledClass>;
  pendingProvider: PendingStateProvider<ScheduledClass> & PendingStateUpdateProvider<ScheduledClass>;
  manageClassStateProvider: ManageClassStateProvider;

  classes: ScheduledClass[] = [];
  // bookedClass: ScheduledClass;

  constructor(private classService: ClassService,
              private accountService: AccountService,
              private bookingService: BookingService,
              private router: Router,
              private route: CurrentRoute,
              private notificationService: NotificationService) {
    this.bookingStateProvider = new BookedClassesBookingStateProvider(this.bookedClassesForCurrentUser);
    this.detailsProvider = new InMemoryUpdatableDetailsStateProvider(sameClassPredicate);
    this.pendingProvider = new InMemoryUpdatablePendingStateProvider(sameClassPredicate);
    this.manageClassStateProvider = new UnmanageableProvider();
  }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
    this.refreshBookings();
    this.refreshClasses();
    this.finishBookingIfNecessary();
    this.finishCancelingIfNecessary();
  }

  async book(bookedClass: ScheduledClass) {
    if (isUnknown(this.currentUser)) {
      return this.authenticateForBooking(bookedClass);
    }
    this.pendingProvider.markPending(bookedClass);
    // TODO: handle case when user registers another user
    const booked = await this.bookingService.book(this.currentUser, bookedClass);
    this.pendingProvider.unmarkPending(bookedClass);
    const template = booked.approved ? this.approvedNotification : this.waitingListNotification;
    this.notificationService.success(template, booked);
    this.refreshClasses();
    this.refreshBookings();
  }

  async unbook(bookedClass: ScheduledClass) {
    if (isUnknown(this.currentUser)) {
      return this.authenticateForCanceling(bookedClass);
    }
    this.pendingProvider.markPending(bookedClass);
    // TODO: handle case when user registers another user
    await this.bookingService.unbook(this.currentUser, bookedClass);
    this.pendingProvider.unmarkPending(bookedClass);
    this.notificationService.success(this.canceledNotification, {bookedClass});
    this.refreshClasses();
    this.refreshBookings();
  }

  isMobileApp() {
    // TODO
    return true;
  }
  
  addToCalendar(bookedClass: ScheduledClass) {
    // TODO
  }
  
  removeFromCalendar(bookedClass: ScheduledClass) {
    // TODO
  }

  private authenticateForBooking(bookedClass: ScheduledClass) {
    this.router.navigate(['users', 'whoareyou'], {
      queryParams: {
        booking: bookedClass.id
      }
    });
  }

  private authenticateForCanceling(bookedClass: ScheduledClass) {
    this.router.navigate(['users', 'whoareyou'], {
      queryParams: {
        canceling: bookedClass.id
      }
    });
  }

  private async refreshClasses() {
    this.classes = await this.classService.list();
  }

  private async refreshBookings() {
    this.bookedClassesForCurrentUser.splice(0, this.bookedClassesForCurrentUser.length);
    this.bookedClassesForCurrentUser.push(...await this.bookingService.getBookedClasses(this.currentUser));
  }


  private async finishBookingIfNecessary() {
    const bookingId = this.route.getQueryParam('booking');
    if (bookingId) {
      const bookedClass = await this.classService.getClassInfo({id: bookingId});
      await this.book(bookedClass);
      this.router.navigate(['']);
    }
  }
  private async finishCancelingIfNecessary() {
    const cancelingId = this.route.getQueryParam('canceling');
    if (cancelingId) {
      const bookedClass = await this.classService.getClassInfo({id: cancelingId});
      await this.unbook(bookedClass);
      this.router.navigate(['']);
    }
  }
}
