import { CanUnbookAnyBookingUnbookableProvider } from './../../services/local/can-unbook-any-booking.provider';
import { AnyStudentProvider } from './../../services/remote/any-student.provider';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { BookingService } from 'src/app/booking/services/booking.service';
import { DateUtil } from './../../../common/util/date.util';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PreferencesService } from 'src/app/account/services/preferences.service';
import { ScheduledClass, Booking, BookingForFriend, Lesson, Place, sameClassPredicate, sameLessonPredicate } from 'src/app/booking/domain/reservation';
import { ClassService } from 'src/app/booking/services/class.service';
import { PreferencesProvider } from 'src/app/booking/services/preferences.provider';
import { BookingStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, ManageClassStateProvider, PendingStateProvider, PendingStateUpdateProvider } from 'src/app/booking/services/single-class-state.provider';
import { PopoverService, PopoverWrapper } from 'src/app/common/components/popover/popover.service';
import { InMemoryUpdatableDetailsStateProvider } from '../../../booking/services/local/in-memory-details-class-state.provider';
import { InMemoryUpdatablePendingStateProvider } from './../../../booking/services/local/in-memory-pending-state.provider';
import { AccountPreferencesProvider } from './../../../booking/services/remote/account-preferences.provider';
import { ManageableProvider } from './../../services/local/manageable.provider';
import { NextLessonOpenedDetailsClassStateProvider } from './../../services/local/next-lesson-opened-details-state.provider';
import { UnbookableProvider } from './../../services/local/unbookable.provider';
import { AlertController } from '@ionic/angular';
import { StudentListUnbookableStateProvider } from 'src/app/booking/services/student-list-unbookable-state.provider';


@Component({
  selector: 'app-classes-page',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage {
  bookingStateProvider: BookingStateProvider;
  detailsProvider: DetailsStateProvider<ScheduledClass> & DetailsStateUpdateProvider<ScheduledClass>;
  pendingProvider: PendingStateProvider<ScheduledClass> & PendingStateUpdateProvider<ScheduledClass>;
  manageClassStateProvider: ManageClassStateProvider;
  lessonDetailsProvider: DetailsStateProvider<Lesson> & DetailsStateUpdateProvider<Lesson>;
  preferencesProvider: PreferencesProvider;
  searchFriendProvider: AutoCompleteService;
  unbookableProvider: StudentListUnbookableStateProvider;

  classes: ScheduledClass[] = [];
  unscheduledLessons: Lesson[] = [];

  @ViewChild('cancelMessage', { static: true })
  cancelMessage: TemplateRef<any>;
  @ViewChild('placeDetails', { static: true })
  placeDetails: TemplateRef<any>;
  @ViewChild('approvedStudents', { static: true })
  approvedStudents: TemplateRef<any>;
  @ViewChild('waitingStudents', { static: true })
  waitingStudents: TemplateRef<any>;
  lastClick: Event; // used for popover
  loading = true;

  private popover: PopoverWrapper;
  private classes$ = new Subject<ScheduledClass[]>();
  private studentListPopover: {
    type: string,
    popover: PopoverWrapper
  };

  constructor(private classService: ClassService,
              private router: Router,
              private popoverService: PopoverService,
              private alertController: AlertController,
              private dateUtil: DateUtil,
              private bookingService: BookingService,
              preferencesService: PreferencesService) {
    this.bookingStateProvider = new UnbookableProvider();
    this.detailsProvider = new NextLessonOpenedDetailsClassStateProvider(this.classes$);
    this.pendingProvider = new InMemoryUpdatablePendingStateProvider(sameClassPredicate);
    this.manageClassStateProvider = new ManageableProvider();
    this.lessonDetailsProvider = new InMemoryUpdatableDetailsStateProvider(sameLessonPredicate);
    this.preferencesProvider = new AccountPreferencesProvider(preferencesService);
    this.searchFriendProvider = new AnyStudentProvider();
    this.unbookableProvider = new CanUnbookAnyBookingUnbookableProvider();
  }

  async ionViewDidEnter() {
    this.refreshClasses();
  }

  addLesson() {
    // TODO: choose between lesson and event
    this.router.navigate(['admin', 'lesson', 'add']);
  }

  async edit(editingClass: ScheduledClass) {
    // TODO: route between lesson and event according to type
    this.router.navigate(['admin', 'lesson', editingClass.id, 'edit']);
  }

  async askCancelMessage(cancelingClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      this.popover = await this.popoverService.show(this.cancelMessage, {
        cancelingClass,
        form: {message: ''}
      }, {
        cssClass: 'cancel-message'
      }/*, this.lastClick*/);
    }, 0);
  }

  async cancel(cancelingClass: ScheduledClass, message: string) {
    this.popover.success();
    this.pendingProvider.markPending(cancelingClass);
    await this.classService.cancel(cancelingClass, message);
    this.pendingProvider.unmarkPending(cancelingClass);
    this.refreshClasses();
  }

  async schedule(lesson: Lesson) {
    this.router.navigate(['admin', 'lesson', lesson.id, 'schedule']);
  }

  async removeLesson(lesson: Lesson) {
    // TODO: implement in next version
  }

  async showPlaceDetails(place: Place) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.placeDetails, {place}, {cssClass: 'place-details'});
    }, 0);
  }

  async showApprovedStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      this.studentListPopover = {
        type: 'approved',
        popover: await this.popoverService.show(this.approvedStudents, {scheduledClass}, {cssClass: 'approved-students'})
      };
    }, 0);
  }

  async showWaitingStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      this.studentListPopover = {
        type: 'waiting',
        popover: await this.popoverService.show(this.waitingStudents, {scheduledClass}, {cssClass: 'waiting-students'})
      };
    }, 0);
  }

  async manualRefresh(event?: any) {
    await this.refreshClasses();
    if (event) {
      event.target.complete();
    }
  }

  async bookForFriend(booking: BookingForFriend) {
    alert('Bientôt disponible');
  }

  async unbookStudent(scheduledClass: ScheduledClass, unbooking: Booking) {
    const alert = await this.alertController.create({
      header: `Désinscrire ${unbooking.student.displayName} ?`,
      message: `Es-tu sûr de vouloir désinscrire ${unbooking.student.displayName} du cours du ${this.dateUtil.formatDateTimeRange(scheduledClass)} ?`,
      buttons: [{
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Désinscrire',
        handler: () => this.unbook(scheduledClass, unbooking)
      }]
    });
    await alert.present();
  }

  async sendMessageToApprovedStudents(scheduledClass: ScheduledClass) {
    this.router.navigate(['admin', 'messages', scheduledClass.id, 'send']);
  }

  private async unbook(scheduledClass: ScheduledClass, unbooking: Booking) {
    const updated = await this.bookingService.unbook(unbooking.student, scheduledClass);
    this.studentListPopover.popover.cancel();
    if (this.studentListPopover.type === 'approved') {
      this.showApprovedStudents(updated);
    } else {
      this.showWaitingStudents(updated);
    }
    this.refreshClasses();
  }

  private async refreshClasses() {
    this.loading = true;
    this.classes = await this.classService.list();
    this.classes$.next(this.classes);
    this.unscheduledLessons = await this.classService.listUnscheduledLessons();
    this.loading = false;
  }
}
