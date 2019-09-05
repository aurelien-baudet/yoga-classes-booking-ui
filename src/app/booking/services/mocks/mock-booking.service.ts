import { UnregisteredUser } from '../../../account/domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  StudentId } from 'src/app/account/domain/student';
import { ClassId, ScheduledClass, ClassState, Booking, Booked } from '../../domain/reservation';
import { BookingService } from '../booking.service';
import { ServerConfig } from 'src/environments/config';
import * as classes from './data/classes.json';

@Injectable({
  providedIn: 'root'
})
export class MockBookingService implements BookingService {
  constructor() { }

  async book(student: StudentId, bookedClass: ClassId): Promise<Booked>;
  async book(uregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<Booked>;
  async book(student: any, bookedClass: ClassId): Promise<Booked> {
    throw new Error('not implemented');
  }

  async unbook(student: StudentId, bookedClass: ClassId): Promise<ScheduledClass>;
  async unbook(uregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<ScheduledClass>;
  async unbook(student: any, bookedClass: ClassId): Promise<ScheduledClass> {
    throw new Error('not implemented');
  }

  async getBookedClasses(student: StudentId): Promise<ScheduledClass[]>;
  async getBookedClasses(unregisteredUser: UnregisteredUser): Promise<ScheduledClass[]>;
  async getBookedClasses(student: any): Promise<ScheduledClass[]> {
    return (classes['default'] as any).filter((c: ScheduledClass) => c.bookings.all.some((b) => b.student.displayName === 'pouet'));
  }
}
