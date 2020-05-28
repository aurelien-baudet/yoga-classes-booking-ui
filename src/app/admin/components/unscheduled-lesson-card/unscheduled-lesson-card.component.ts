import { SportLevel, PostureLevel } from './../../../booking/domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from 'src/app/booking/domain/reservation';

@Component({
  selector: 'app-unscheduled-lesson-card',
  templateUrl: './unscheduled-lesson-card.component.html',
  styleUrls: ['./unscheduled-lesson-card.component.scss'],
})
export class UnscheduledLessonCardComponent {
  @Input()
  lesson: Lesson;
  @Input()
  showDetails = false;
  @Input()
  schedulable = true;
  @Input()
  removable = true;

  @Output()
  viewDetails = new EventEmitter<Lesson>();
  @Output()
  hideDetails = new EventEmitter<Lesson>();
  @Output()
  schedule = new EventEmitter<Lesson>();
  @Output()
  remove = new EventEmitter<Lesson>();


  getSportLevel() {
    const difficulty = this.lesson.difficulty;
    if (!difficulty || difficulty.sportLevel === null) {
      return null;
    }
    return SportLevel.from(difficulty.sportLevel);
  }

  getPostureLevel() {
    const difficulty = this.lesson.difficulty;
    if (!difficulty || difficulty.postureLevel === null) {
      return null;
    }
    return PostureLevel.from(difficulty.postureLevel);
  }
}
