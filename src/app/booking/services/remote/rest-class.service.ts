import { PlaceId, UpdatedLesson } from './../../domain/reservation';
import { DateUtil } from './../../../common/util/date.util';
import { Instant } from '../../domain/general';
import { Injectable } from '@angular/core';
import { ScheduledClass, Lesson, LessonId, ClassId, ClassState, Booking, Place, NewLesson } from '../../domain/reservation';
import { ClassService } from '../class.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerConfig } from 'src/environments/config';
import { first } from 'rxjs/operators';



interface NewLessonServerDto {
  info: Pick<Lesson, 'title' | 'description' | 'maxStudents' | 'photos' | 'difficulty' | 'subscriptionPack'>;
  placeId: string;
  teacherId: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestClassService implements ClassService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig,
              private dateUtil: DateUtil) {}

  async register(lesson: NewLesson): Promise<Lesson> {
    return await this.http.post<Lesson>(`${this.serverConfig.url}/lessons`, this.toServerLesson(lesson))
      .pipe(first())
      .toPromise();
  }

  async schedule(lesson: LessonId, start: Instant, end: Instant): Promise<ScheduledClass> {
    return await this.http.patch<ScheduledClass>(`${this.serverConfig.url}/lessons/${lesson.id}`, {start, end})
      .pipe(first())
      .toPromise();
  }

  async getLessonInfo(lesson: LessonId): Promise<Lesson> {
    return await this.http.get<Lesson>(`${this.serverConfig.url}/lessons/${lesson.id}`)
      .pipe(first())
      .toPromise();
  }

  async listUnscheduledLessons(): Promise<Lesson[]> {
    return await this.http.get<Lesson[]>(`${this.serverConfig.url}/lessons`, {
        params: {
          unscheduled: 'true'
        }
      })
      .pipe(first())
      .toPromise();
  }

  async listScheduledClassesFor(lesson: LessonId, from?: Instant, to?: Instant): Promise<ScheduledClass[]> {
    const params = {lesson: lesson.id};
    if (from) {
      params['from'] = this.dateUtil.toISODateString(from);
    }
    if (to) {
      params['to'] = this.dateUtil.toISODateString(to);
    }
    return await this.http.get<ScheduledClass[]>(`${this.serverConfig.url}/classes`, {
        params
      })
      .pipe(first())
      .toPromise();
  }

  async cancel(scheduledClass: ClassId, message: string): Promise<ScheduledClass> {
    return await this.http.patch<ScheduledClass>(`${this.serverConfig.url}/classes/${scheduledClass.id}`, {message})
      .pipe(first())
      .toPromise();
  }

  async getClassInfo(scheduledClass: ClassId): Promise<ScheduledClass> {
    return await this.http.get<ScheduledClass>(`${this.serverConfig.url}/classes/${scheduledClass.id}`)
      .pipe(first())
      .toPromise();
  }

  async list(): Promise<ScheduledClass[]> {
    return await this.http.get<ScheduledClass[]>(`${this.serverConfig.url}/classes`)
      .pipe(first())
      .toPromise();
  }

  async changePlace(scheduledClass: ClassId, newPlace: PlaceId): Promise<ScheduledClass> {
    return await this.http.patch<ScheduledClass>(`${this.serverConfig.url}/classes/${scheduledClass.id}/places/${newPlace.id}`, {})
      .pipe(first())
      .toPromise();
  }
  async changePlaceForSpecificClass(scheduledClass: ClassId, newPlace: PlaceId): Promise<ScheduledClass> {
    return await this.http.patch<ScheduledClass>(`${this.serverConfig.url}/classes/${scheduledClass.id}/places/${newPlace.id}`, {})
      .pipe(first())
      .toPromise();
  }

  async changePlaceForAllClasses(lesson: LessonId, newPlace: PlaceId): Promise<Lesson> {
    return await this.http.patch<Lesson>(`${this.serverConfig.url}/lessons/${lesson.id}/places/${newPlace.id}`, {})
      .pipe(first())
      .toPromise();
  }

  async updateLessonInfoForSpecificClass(scheduledClass: ClassId, updatedInfo: UpdatedLesson): Promise<ScheduledClass> {
    return await this.http.patch<ScheduledClass>(`${this.serverConfig.url}/classes/${scheduledClass.id}/lesson/info`, updatedInfo)
      .pipe(first())
      .toPromise();
  }

  async updateLessonInfoForAllClasses(updatedInfo: UpdatedLesson): Promise<Lesson> {
    return await this.http.patch<Lesson>(`${this.serverConfig.url}/lessons/${updatedInfo.id}/info`, updatedInfo)
      .pipe(first())
      .toPromise();
  }

  private toServerLesson(lesson: NewLesson): NewLessonServerDto {
    return {
      info: lesson,
      placeId: lesson.place.id,
      teacherId: lesson.teacher.id
    };
  }
}
