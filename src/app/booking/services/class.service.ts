import { ScheduledClass, Lesson, LessonId, ClassId, Place } from '../domain/reservation';
import { Instant } from '../domain/general';


export abstract class ClassService {
  async abstract register(lesson: Lesson): Promise<Lesson>;
  async abstract schedule(lesson: LessonId, start: Instant, end: Instant): Promise<ScheduledClass>;
  async abstract cancel(scheduledClass: ClassId): Promise<ScheduledClass>;
  async abstract getClassInfo(scheduledClass: ClassId): Promise<ScheduledClass>;
  async abstract list(): Promise<ScheduledClass[]>;
  async abstract changePlace(scheduledClass: ClassId, newPlace: Place): Promise<ScheduledClass>;
}
