import { approvedForStudent } from './../../domain/reservation';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student, StudentId } from 'src/app/account/domain/student';
import { User, UserId, Role, isUnknown, isRegisteredUser } from 'src/app/account/domain/user';
import { ClassId, ScheduledClass, ClassState, Booking, Booked } from '../../domain/reservation';
import { BookingService } from '../booking.service';
import { ServerConfig } from 'src/environments/config';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestBookingService implements BookingService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  async book(student: StudentId, bookedClass: ClassId): Promise<Booked>;
  async book(uregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<Booked>;
  async book(student: any, bookedClass: ClassId): Promise<Booked> {
    const updated = await this.bookClass(student, bookedClass);
    return {
      bookedClass: updated,
      approved: approvedForStudent(updated, student)
    };
  }

  private async bookClass(student: any, bookedClass: ClassId): Promise<ScheduledClass> {
    if (isUnknown(student)) {
      // TODO: throw
    }
    if (isRegisteredUser(student)) {
      return this.http.post<ScheduledClass>(`${this.serverConfig.url}/classes/${bookedClass.id}/bookings/${student.id}`, {})
        .pipe(first())
        .toPromise();
    }
    return this.http.post<ScheduledClass>(`${this.serverConfig.url}/classes/${bookedClass.id}/bookings`, student)
      .pipe(first())
      .toPromise();
  }

  async unbook(student: StudentId, bookedClass: ClassId): Promise<ScheduledClass>;
  async unbook(uregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<ScheduledClass>;
  async unbook(student: any, bookedClass: ClassId): Promise<ScheduledClass> {
    if (isUnknown(student)) {
      // TODO: throw
    }
    if (isRegisteredUser(student)) {
      return this.http.delete<ScheduledClass>(`${this.serverConfig.url}/classes/${bookedClass.id}/bookings/${student.id}`)
        .pipe(first())
        .toPromise();
    }
    return this.http.request<ScheduledClass>('DELETE', `${this.serverConfig.url}/classes/${bookedClass.id}/bookings`, {body: student})
      .pipe(first())
      .toPromise();
  }

  async getBookedClasses(student: StudentId): Promise<ScheduledClass[]>;
  async getBookedClasses(unregisteredUser: UnregisteredUser): Promise<ScheduledClass[]>;
  async getBookedClasses(student: any): Promise<ScheduledClass[]> {
    if (isUnknown(student)) {
      return [];
    }
    if (isRegisteredUser(student)) {
      return this.http.get<ScheduledClass[]>(`${this.serverConfig.url}/classes/bookings/${student.id}`)
        .pipe(first())
        .toPromise();
    }
    return this.http.get<ScheduledClass[]>(`${this.serverConfig.url}/classes/bookings`, {params: student})
      .pipe(first())
      .toPromise();
  }
}
