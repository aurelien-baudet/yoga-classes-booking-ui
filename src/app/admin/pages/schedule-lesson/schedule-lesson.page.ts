import { Router } from '@angular/router';
import { Instant } from 'src/app/booking/domain/general';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { ClassService } from 'src/app/booking/services/class.service';
import { Component, OnInit } from '@angular/core';
import { Lesson, ScheduledClass } from 'src/app/booking/domain/reservation';

@Component({
  selector: 'app-schedule-lesson-page',
  templateUrl: './schedule-lesson.page.html',
  styleUrls: ['./schedule-lesson.page.scss'],
})
export class ScheduleLessonPage {
  lesson: Lesson;
  scheduledClassesForLesson: ScheduledClass[];

  constructor(private classService: ClassService,
              private route: CurrentRoute,
              private router: Router) { }

  async ionViewDidEnter() {
    const lessonId = this.route.getPathParam('lessonId');
    this.lesson = await this.classService.getLessonInfo({id: lessonId});
    await this.refreshScheduledClassesForLesson();
  }

  async schedule(lesson: Lesson, start: Instant, end: Instant) {
    await this.classService.schedule(lesson, start, end);
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
