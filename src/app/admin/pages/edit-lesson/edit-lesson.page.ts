import { CurrentRoute } from 'src/app/common/util/router.util';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { ClassService } from 'src/app/booking/services/class.service';
import { Lesson, Place, ScheduledClass, isSamePlace, UpdatedLesson } from 'src/app/booking/domain/reservation';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TeacherInfo, isSameTeacher } from 'src/app/account/domain/teacher';
import { PlaceService } from '../../services/place.service';
import { PopoverService, PopoverWrapper } from 'src/app/common/components/popover/popover.service';

@Component({
  selector: 'app-edit-lesson-page',
  templateUrl: './edit-lesson.page.html',
  styleUrls: ['./edit-lesson.page.scss'],
})
export class EditLessonPage {

  scheduledClass: ScheduledClass;
  originalLesson: Lesson;
  places: Place[];

  @ViewChild('chooseOccurrences')
  private chooseOccurrences: TemplateRef<any>;
  popover: PopoverWrapper;

  constructor(private classService: ClassService,
              private placeService: PlaceService,
              private userService: AccountService,
              private router: Router,
              private route: CurrentRoute,
              private popoverService: PopoverService) { }

  async ionViewDidEnter() {
    const classId = this.route.getPathParam('classId');
    this.scheduledClass = await this.classService.getClassInfo({id: classId});
    this.originalLesson = {...this.scheduledClass.lesson};
    this.places = await this.placeService.list();
  }

  async selectOccurrences(scheduledClass: ScheduledClass, updatedLesson: UpdatedLesson) {
    this.popover = await this.popoverService.show(this.chooseOccurrences, {scheduledClass, updatedLesson}/*, this.lastClick*/);
  }

  async updateSpecificClass(scheduledClass: ScheduledClass, updatedLesson: UpdatedLesson) {
    if (this.hasInfoChanged(this.originalLesson, updatedLesson)) {
      await this.classService.updateLessonInfoForSpecificClass(scheduledClass, updatedLesson);
    }
    if (this.hasPlaceChanged(this.originalLesson, updatedLesson)) {
      await this.classService.changePlace(scheduledClass, updatedLesson.place);
    }
    this.router.navigate(['admin', 'classes']);
  }

  async updateLesson(lesson: UpdatedLesson) {
    await this.classService.updateLessonInfoForAllClasses(lesson);
    this.router.navigate(['admin', 'classes']);
  }

  private hasInfoChanged(original: Lesson, updated: UpdatedLesson): boolean {
    return original.description !== updated.description
      || original.maxStudents !== updated.maxStudents
      || !isSameTeacher(original.teacher, updated.teacher)
      || original.title !== updated.title;
      // TODO: compare photos too when really implemented
  }

  private hasPlaceChanged(original: Lesson, updated: UpdatedLesson): boolean {
    return !isSamePlace(original.place, updated.place);
  }
}
