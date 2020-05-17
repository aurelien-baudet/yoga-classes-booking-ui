import { Lesson, UpdatedLesson } from 'src/app/booking/domain/reservation';
import { NewLesson, Place, PlaceId, isSamePlace } from './../../../booking/domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { TeacherInfo, TeacherId, isSameTeacher } from 'src/app/account/domain/teacher';

type LessonModel = Pick<Lesson, 'title' | 'description' | 'maxStudents' | 'photos'> & {
  placeId: string,
  teacherId: string
};

const defaultModel = (): LessonModel => ({
  title: '',
  description: '',
  maxStudents: null,
  photos: [],
  placeId: '',
  teacherId: ''
});

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss'],
})
export class LessonFormComponent {
  @Input()
  set lesson(lesson: Lesson) {
    setTimeout(() => {  // FIXME: fix ion-select initial value correctly
      if (lesson) {
        this.lessonId = lesson.id;
        this.lessonModel = {
          title: lesson.title,
          description: lesson.description,
          maxStudents: lesson.maxStudents,
          photos: lesson.photos,
          placeId: lesson.place.id,
          teacherId: lesson.teacher.id
        };
      } else {
        this.lessonId = '';
        this.lessonModel = defaultModel();
      }
    }, 500);
  }
  @Input()
  places: Place[];
  @Input()
  set teacher(teacher: TeacherInfo) {
    this.lessonModel.teacherId = teacher ? teacher.id : '';
  }
  @Input()
  buttonText: string;

  @Output()
  add = new EventEmitter<NewLesson>();
  @Output()
  update = new EventEmitter<UpdatedLesson>();

  private lessonId: string;
  public lessonModel: LessonModel = defaultModel();


  save(model: LessonModel) {
    const lesson = {
      title: model.title,
      description: model.description,
      maxStudents: model.maxStudents,
      photos: model.photos,
      place: {
        id: model.placeId
      },
      teacher: {
        id: model.teacherId
      }
    };
    if (!this.lessonId) {
      this.add.emit(lesson);
    } else {
      this.update.emit({
        id: this.lessonId,
        ...lesson
      });
    }
  }

}
