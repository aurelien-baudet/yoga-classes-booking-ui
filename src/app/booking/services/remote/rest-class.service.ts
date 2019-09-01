import { Instant } from '../../domain/general';
import { Injectable } from '@angular/core';
import { ScheduledClass, Lesson, LessonId, ClassId, ClassState, Booking, Place } from '../../domain/reservation';
import { ClassService } from '../class.service';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from 'src/environments/config';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestClassService implements ClassService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) {}
  
  async register(lesson: Lesson): Promise<Lesson> {
    throw new Error("Not implemented");
    // return Promise.resolve({
    //   id: Date.now() + '_' + Math.random(),
    //   ...info
    // });
  }

  async schedule(lesson: LessonId, start: Instant, end: Instant): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }

  async cancel(scheduledClass: ClassId): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }

  async getClassInfo(scheduledClass: ClassId): Promise<ScheduledClass> {
    return this.http.get<ScheduledClass>(`${this.serverConfig.url}/classes/${scheduledClass.id}`)
      .pipe(first())
      .toPromise();
  }

  async list(): Promise<ScheduledClass[]> {
    return this.http.get<ScheduledClass[]>(`${this.serverConfig.url}/classes`)
      .pipe(first())
      .toPromise();
  }

  async changePlace(scheduledClass: ClassId, newPlace: Place): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }
}
