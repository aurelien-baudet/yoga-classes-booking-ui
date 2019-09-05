import { Lesson } from 'src/app/booking/domain/reservation';
import { NewLesson, Place, PlaceId } from './../../../booking/domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherInfo, TeacherId } from 'src/app/account/domain/teacher';

type LessonModel = Pick<Lesson, 'title' | 'description' | 'maxStudents' | 'photos'> & {
  place: PlaceId,
  teacher: TeacherId
};

const defaultModel = (): LessonModel => ({
  title: '',
  description: '',
  maxStudents: null,
  photos: [],
  place: {
    id: ''
  },
  teacher: {
    id: ''
  }
});

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss'],
})
export class LessonFormComponent {
  @Input()
  set lesson(lesson: Lesson) {
    if (lesson) {
      this.lessonId = lesson.id;
      this.lessonModel = lesson;
    } else {
      this.lessonId = '';
      this.lessonModel = defaultModel();
    }
  }
  @Input()
  places: Place[];
  @Input()
  set teacher(teacher: TeacherInfo) {
    this.lessonModel.teacher.id = teacher ? teacher.id : '';
  }

  @Output()
  add = new EventEmitter<NewLesson>();
  @Output()
  updateInfo = new EventEmitter<Lesson>();
  @Output()
  changePlace = new EventEmitter<Lesson>();

  private lessonId: string;
  protected lessonModel: LessonModel = defaultModel();

  save(model: LessonModel) {
    if (!this.lessonId) {
      this.add.emit(model);
    }
    if (this.hasInfoChanged(model)) {
      // this.updateInfo.emit({
      //   id: this.lessonId,
      //   ...model
      // });
    }
    if (this.hasPlaceChanged(model)) {
      // this.changePlace.emit({

      // })
    }
  }

  private hasInfoChanged(model: LessonModel): boolean {
    return false;
  }

  private hasPlaceChanged(model: LessonModel): boolean {
    return false;
  }
}
