import { CurrentRoute } from 'src/app/common/util/router.util';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { ClassService } from 'src/app/booking/services/class.service';
import { Lesson, Place, ScheduledClass, isSamePlace, UpdatedLesson, LessonDifficulty } from 'src/app/booking/domain/reservation';
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
  teachers: TeacherInfo[];

  @ViewChild('chooseOccurrences', { static: true })
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
    this.teachers = await this.userService.listTeachers();
  }

  async selectOccurrences(scheduledClass: ScheduledClass, updatedLesson: UpdatedLesson) {
    this.popover = await this.popoverService.show(this.chooseOccurrences, {scheduledClass, updatedLesson}, {cssClass: 'choose-occurrences'});
  }

  async updateSpecificClass(scheduledClass: ScheduledClass, updatedLesson: UpdatedLesson) {
    if (this.hasInfoChanged(this.originalLesson, updatedLesson)) {
      await this.classService.updateLessonInfoForSpecificClass(scheduledClass, updatedLesson);
    }
    if (this.hasPlaceChanged(this.originalLesson, updatedLesson)) {
      await this.classService.changePlaceForSpecificClass(scheduledClass, updatedLesson.place);
    }
    this.router.navigate(['admin', 'classes']);
  }

  async updateLesson(lesson: UpdatedLesson) {
    if (this.hasInfoChanged(this.originalLesson, lesson)) {
      await this.classService.updateLessonInfoForAllClasses(lesson);
    }
    if (this.hasPlaceChanged(this.originalLesson, lesson)) {
      await this.classService.changePlaceForAllClasses(lesson, lesson.place);
    }
    this.router.navigate(['admin', 'classes']);
  }

  private hasInfoChanged(original: Lesson, updated: UpdatedLesson): boolean {
    return original.description !== updated.description
      || original.maxStudents !== updated.maxStudents
      || !isSameTeacher(original.teacher, updated.teacher)
      || original.title !== updated.title
      || !this.isSameDifficulty(original.difficulty, updated.difficulty)
      || original.subscriptionPack !== updated.subscriptionPack;
      // TODO: compare photos too when really implemented
  }

  private isSameDifficulty(original: LessonDifficulty, updated: LessonDifficulty): boolean {
    // both are set => depends on values
    if (original && updated) {
      return original.postureLevel === updated.postureLevel
        && original.sportLevel === updated.sportLevel;
    }
    // both are not set => identical
    // one set and the other not set => different
    return !original && !updated;
  }

  private hasPlaceChanged(original: Lesson, updated: UpdatedLesson): boolean {
    return !isSamePlace(original.place, updated.place);
  }
}
