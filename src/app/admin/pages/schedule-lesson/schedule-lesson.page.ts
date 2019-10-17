import { DateUtil } from './../../../common/util/date.util';
import { Router } from '@angular/router';
import { Instant, Recurrence } from 'src/app/booking/domain/general';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { ClassService } from 'src/app/booking/services/class.service';
import { Component, OnInit } from '@angular/core';
import { Lesson, ScheduledClass } from 'src/app/booking/domain/reservation';
import { PopoverService } from 'src/app/common/components/popover/popover.service';

@Component({
  selector: 'app-schedule-lesson-page',
  templateUrl: './schedule-lesson.page.html',
  styleUrls: ['./schedule-lesson.page.scss'],
})
export class ScheduleLessonPage {
  lesson: Lesson;
  scheduledClassesForLesson: ScheduledClass[];
  displayedMonth = new Date();

  constructor(private classService: ClassService,
              private route: CurrentRoute,
              private router: Router,
              private dateUtil: DateUtil) { }

  async ionViewDidEnter() {
    const lessonId = this.route.getPathParam('lessonId');
    this.lesson = await this.classService.getLessonInfo({id: lessonId});
    await this.refreshScheduledClassesForLesson();
  }

  async schedule(lesson: Lesson, start: Instant, end: Instant, recurrence: Recurrence) {
    for (const range of this.dateUtil.frequencyIterable(recurrence.frequency, {start, end}, recurrence.until)) {
      await this.classService.schedule(lesson, range.start, range.end);
    }
    await this.refreshScheduledClassesForLesson();
  }

  finish() {
    this.router.navigate(['']);
  }

  private async refreshScheduledClassesForLesson() {
    this.scheduledClassesForLesson = await this.classService.listScheduledClassesFor(this.lesson, Date.now());
    console.log('scheduledClassesForLesson', this.lesson.id, this.scheduledClassesForLesson);
  }
}
