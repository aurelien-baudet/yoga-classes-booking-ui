import { UnregisteredUser } from './../../../account/domain/unregistered';
import { NotificationService } from './../../../common/components/notification/notification.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StudentSingleClassStateProvider } from './../../services/local/student-single-class-state.provider';
import { User, isUnkown as isUnknown } from 'src/app/account/domain/user';
import { AccountService } from './../../../account/services/account.service';
import { ScheduledClass, sameClassPredicate, approvedForStudent } from '../../domain/reservation';
import { ClassService } from '../../services/class.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { SingleClassStateProvider } from '../../services/single-class-state.provider';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { ToastController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-lessons-page',
  templateUrl: './book-lessons.page.html',
  styleUrls: ['./book-lessons.page.scss'],
})
export class BookLessonsPage {
  private currentUser: User | UnregisteredUser;
  private bookedClassesForCurrentUser: ScheduledClass[] = [];
  private pendingBookings: ScheduledClass[] = [];
  private opened: ScheduledClass[] = [];

  @ViewChild('approvedNotification')
  approvedNotification: TemplateRef<any>;
  @ViewChild('waitingListNotification')
  waitingListNotification: TemplateRef<any>;
  @ViewChild('canceledNotification')
  canceledNotification: TemplateRef<any>;

  classStateProvider: SingleClassStateProvider;
  classes: ScheduledClass[] = [];
  bookedClass: ScheduledClass;

  constructor(private classService: ClassService,
              private accountService: AccountService,
              private bookingService: BookingService,
              private router: Router,
              private route: CurrentRoute,
              private notificationService: NotificationService) {
    this.classStateProvider = new StudentSingleClassStateProvider(this.bookedClassesForCurrentUser, this.pendingBookings, this.opened);
  }

  async ionViewDidEnter() {
    console.log('book-lessons');
    this.currentUser = await this.accountService.getUserInfo();
    this.refreshBookings();
    this.refreshClasses();
    this.finishBookingIfNecessary();
    this.finishCancelingIfNecessary();
  }

  async book(bookedClass: ScheduledClass) {
    console.log('connecter user', this.currentUser);
    if (isUnknown(this.currentUser)) {
      return this.authenticateForBooking(bookedClass);
    }
    this.markReservationAsPending(bookedClass);
    // TODO: handle case when user registers another user
    const booked = await this.bookingService.book(this.currentUser, bookedClass);
    this.unmarkReservationAsPending(bookedClass);
    const template = booked.approved ? this.approvedNotification : this.waitingListNotification;
    this.notificationService.success(template, booked);
    this.refreshClasses();
    this.refreshBookings();
  }

  async cancel(bookedClass: ScheduledClass) {
    console.log('connecter user', this.currentUser);
    if (isUnknown(this.currentUser)) {
      return this.authenticateForCanceling(bookedClass);
    }
    this.markReservationAsPending(bookedClass);
    // TODO: handle case when user registers another user
    await this.bookingService.cancel(this.currentUser, bookedClass);
    this.unmarkReservationAsPending(bookedClass);
    this.notificationService.success(this.canceledNotification, {bookedClass});
    this.refreshClasses();
    this.refreshBookings();
  }

  markAsOpened(bookedClass: ScheduledClass) {
    this.opened.push(bookedClass);
  }

  markAsClosed(bookedClass: ScheduledClass) {
    let idx;
    do {
      idx = this.opened.findIndex(sameClassPredicate(bookedClass));
      if (idx !== -1) {
        this.opened.splice(idx, 1);
      }
    } while (idx !== -1);
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

  private markReservationAsPending(bookedClass: ScheduledClass) {
    this.pendingBookings.push(bookedClass);
  }

  private unmarkReservationAsPending(bookedClass: ScheduledClass) {
    let idx;
    do {
      idx = this.pendingBookings.findIndex(sameClassPredicate(bookedClass));
      if (idx !== -1) {
        this.pendingBookings.splice(idx, 1);
      }
    } while (idx !== -1);
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
      await this.cancel(bookedClass);
      this.router.navigate(['']);
    }
  }
}
