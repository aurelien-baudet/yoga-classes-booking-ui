import { PlaceId, UpdatedLesson } from './../../domain/reservation';
import { Instant } from '../../domain/general';
import { Injectable } from '@angular/core';
import { ScheduledClass, Lesson, LessonId, ClassId, ClassState, Booking, Place, NewLesson, isSameLesson, sameLessonPredicate } from '../../domain/reservation';
import { ClassService } from '../class.service';
import * as classes from './data/classes.json';
import * as unscheduled from './data/unscheduled.json';
import { TeacherId } from 'src/app/account/domain/teacher';

@Injectable({
  providedIn: 'root'
})
export class MockClassService implements ClassService {
  constructor() {}

  async register(lesson: NewLesson): Promise<Lesson> {
    throw new Error('not implemented');
  }

  async schedule(lesson: LessonId, start: Instant, end: Instant): Promise<ScheduledClass> {
    throw new Error('not implemented');
  }

  async getLessonInfo(lesson: LessonId): Promise<Lesson> {
    const lessonInfo = classes["default"]
            .map((c) => c.lesson)
            .find(sameLessonPredicate(lesson));
    console.log('getLessonInfo', lesson, '=>', lessonInfo);
    return lessonInfo;
  }

  async listUnscheduledLessons(): Promise<Lesson[]> {
    return unscheduled['default'] as any;
  }

  async listScheduledClassesFor(lesson: LessonId, from?: Instant, to?: Instant): Promise<ScheduledClass[]> {
    return classes["default"]
            .filter((c) => isSameLesson(c.lesson, lesson));
  }

  async cancel(scheduledClass: ClassId, message: string): Promise<ScheduledClass> {
    throw new Error('not implemented');
  }

  async getClassInfo(scheduledClass: ClassId): Promise<ScheduledClass> {
    throw new Error('not implemented');
  }

  async list(): Promise<ScheduledClass[]> {
    console.log('classes', classes);
    return classes['default'] as any;
  }

  async changePlaceForSpecificClass(scheduledClass: ClassId, newPlace: PlaceId): Promise<ScheduledClass> {
    throw new Error('not implemented');
  }

  async changePlaceForAllClasses(lesson: LessonId, newPlace: PlaceId): Promise<Lesson> {
    throw new Error('not implemented');
  }

  async updateLessonInfoForSpecificClass(scheduledClass: ClassId, updatedInfo: UpdatedLesson): Promise<ScheduledClass> {
    throw new Error("Method not implemented.");
  }

  async updateLessonInfoForAllClasses(updatedInfo: UpdatedLesson): Promise<Lesson> {
    throw new Error("Method not implemented.");
  }

  changeTeacherForSpecificClass(scheduledClass: ClassId, newTeacher: TeacherId): Promise<ScheduledClass> {
    throw new Error("Method not implemented.");
  }
  changeTeacherForAllClasses(lesson: LessonId, newTeacher: TeacherId): Promise<Lesson> {
    throw new Error("Method not implemented.");
  }

  async removeLesson(lesson: LessonId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async removeClass(scheduledClass: ClassId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
