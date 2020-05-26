import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PreferencesService } from 'src/app/account/services/preferences.service';
import { ScheduledClass } from 'src/app/booking/domain/reservation';
import { ClassService } from 'src/app/booking/services/class.service';
import { PreferencesProvider } from 'src/app/booking/services/preferences.provider';
import { BookingStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, ManageClassStateProvider, PendingStateProvider, PendingStateUpdateProvider } from 'src/app/booking/services/single-class-state.provider';
import { PopoverService, PopoverWrapper } from 'src/app/common/components/popover/popover.service';
import { InMemoryUpdatableDetailsStateProvider } from '../../../booking/services/local/in-memory-details-class-state.provider';
import { BookingForFriend, Lesson, Place, sameClassPredicate, sameLessonPredicate, UnbookingForFriend } from './../../../booking/domain/reservation';
import { InMemoryUpdatablePendingStateProvider } from './../../../booking/services/local/in-memory-pending-state.provider';
import { AccountPreferencesProvider } from './../../../booking/services/remote/account-preferences.provider';
import { ManageableProvider } from './../../services/local/manageable.provider';
import { NextLessonOpenedDetailsClassStateProvider } from './../../services/local/next-lesson-opened-details-state.provider';
import { UnbookableProvider } from './../../services/local/unbookable.provider';

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

  private popover: PopoverWrapper;
  private classes$ = new Subject<ScheduledClass[]>();

  constructor(private classService: ClassService,
              private router: Router,
              private popoverService: PopoverService,
              private preferencesService: PreferencesService) {
    this.bookingStateProvider = new UnbookableProvider();
    this.detailsProvider = new NextLessonOpenedDetailsClassStateProvider(this.classes$);
    this.pendingProvider = new InMemoryUpdatablePendingStateProvider(sameClassPredicate);
    this.manageClassStateProvider = new ManageableProvider();
    this.lessonDetailsProvider = new InMemoryUpdatableDetailsStateProvider(sameLessonPredicate);
    this.preferencesProvider = new AccountPreferencesProvider(preferencesService);
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
      await this.popoverService.show(this.approvedStudents, {scheduledClass}, {cssClass: 'approved-students'});
    }, 0);
  }

  async showWaitingStudents(scheduledClass: ScheduledClass) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      await this.popoverService.show(this.waitingStudents, {scheduledClass}, {cssClass: 'waiting-students'});
    }, 0);
  }

  async bookForFriend(booking: BookingForFriend) {
    alert('Bientôt disponible');
  }

  async unbookForFriend(unbooking: UnbookingForFriend) {
    alert('Bientôt disponible');
  }

  private async refreshClasses() {
    this.classes = await this.classService.list();
    this.classes$.next(this.classes);
    this.unscheduledLessons = await this.classService.listUnscheduledLessons();
  }
}
