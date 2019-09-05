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
  async abstract changePlace(scheduledClass: ClassId, newPlace: Place): Promise<ScheduledClass>;
}
