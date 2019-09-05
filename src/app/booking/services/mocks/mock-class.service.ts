import { Instant } from '../../domain/general';
import { Injectable } from '@angular/core';
import { ScheduledClass, Lesson, LessonId, ClassId, ClassState, Booking, Place, NewLesson } from '../../domain/reservation';
import { ClassService } from '../class.service';
import * as classes from './data/classes.json';

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
    throw new Error('not implemented');
  }

  async listUnscheduledLessons(): Promise<Lesson[]> {
    throw new Error('not implemented');
  }

  async listScheduledClassesFor(lesson: LessonId, from?: Instant, to?: Instant): Promise<ScheduledClass[]> {
    throw new Error('not implemented');
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

  async changePlace(scheduledClass: ClassId, newPlace: Place): Promise<ScheduledClass> {
    throw new Error('not implemented');
  }
}
