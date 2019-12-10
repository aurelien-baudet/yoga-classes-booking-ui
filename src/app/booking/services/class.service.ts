import { UpdatedLesson } from 'src/app/booking/domain/reservation';
import { PlaceId } from './../domain/reservation';
import { ScheduledClass, Lesson, LessonId, ClassId, Place, NewLesson } from '../domain/reservation';
import { Instant } from '../domain/general';


export abstract class ClassService {
  async abstract register(lesson: NewLesson): Promise<Lesson>;
  async abstract schedule(lesson: LessonId, start: Instant, end: Instant): Promise<ScheduledClass>;
  async abstract getLessonInfo(lesson: LessonId): Promise<Lesson>;
  async abstract listUnscheduledLessons(): Promise<Lesson[]>;
  async abstract listScheduledClassesFor(lesson: LessonId, from?: Instant, to?: Instant): Promise<ScheduledClass[]>;
  async abstract cancel(scheduledClass: ClassId, message: string): Promise<ScheduledClass>;
  async abstract getClassInfo(scheduledClass: ClassId): Promise<ScheduledClass>;
  async abstract list(): Promise<ScheduledClass[]>;
  async abstract changePlaceForSpecificClass(scheduledClass: ClassId, newPlace: PlaceId): Promise<ScheduledClass>;
  async abstract changePlaceForAllClasses(lesson: LessonId, newPlace: PlaceId): Promise<Lesson>;
  async abstract updateLessonInfoForSpecificClass(scheduledClass: ClassId, updatedInfo: UpdatedLesson): Promise<ScheduledClass>;
  async abstract updateLessonInfoForAllClasses(updatedInfo: UpdatedLesson): Promise<Lesson>;
}
