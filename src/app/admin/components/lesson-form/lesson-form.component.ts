import { Lesson, UpdatedLesson } from 'src/app/booking/domain/reservation';
import { NewLesson, Place, PlaceId, isSamePlace, PostureLevel, SportLevel } from './../../../booking/domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { Teacher, TeacherInfo, TeacherId, isSameTeacher } from 'src/app/account/domain/teacher';

type LessonModel = Pick<Lesson, 'title' | 'description' | 'maxStudents' | 'photos'> & {
  sportLevel: number | null,
  postureLevel: number | null,
  placeId: string,
  teacherId: string,
  subscriptionPack: boolean
};

const defaultModel = (): LessonModel => ({
  title: '',
  description: '',
  maxStudents: null,
  photos: [],
  placeId: '',
  teacherId: '',
  sportLevel: null,
  postureLevel: null,
  subscriptionPack: true
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
          teacherId: lesson.teacher.id,
          sportLevel: lesson.difficulty.sportLevel,
          postureLevel: lesson.difficulty.postureLevel,
          subscriptionPack: lesson.subscriptionPack === 'STANDARD'
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
  teachers: TeacherInfo[];
  /*@Input()
  set teacher(teacher: TeacherInfo) {
    this.lessonModel.teacherId = teacher ? teacher.id : '';
  }*/
  @Input()
  buttonText: string;
  @Input()
  sportLevels = SportLevel.all;
  @Input()
  postureLevels = PostureLevel.all;

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
      difficulty: {
        sportLevel: model.sportLevel,
        postureLevel: model.postureLevel,
      },
      place: {
        id: model.placeId
      },
      teacher: {
        id: model.teacherId
      },
      subscriptionPack: model.subscriptionPack ? 'STANDARD' : 'NONE'
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
