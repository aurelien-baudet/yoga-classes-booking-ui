import { UnregisteredUser } from './../../account/domain/unregistered';
import { Injectable } from '@angular/core';
import { Student, StudentId } from 'src/app/account/domain/student';
import { User, UserId } from 'src/app/account/domain/user';
import { ClassId, ScheduledClass, Booked } from '../domain/reservation';

export abstract class BookingService {
  async abstract getBookedClasses(student: StudentId): Promise<ScheduledClass[]>;
  async abstract getBookedClasses(unregisteredUser: UnregisteredUser): Promise<ScheduledClass[]>;

  async abstract book(student: StudentId, bookedClass: ClassId): Promise<Booked>;
  async abstract book(unregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<Booked>;

  async abstract unbook(student: StudentId, bookedClass: ClassId): Promise<ScheduledClass>;
  async abstract unbook(unregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<ScheduledClass>;

  async abstract confirm(student: StudentId, bookedClass: ClassId): Promise<Booked>;
  async abstract confirm(unregisteredUser: UnregisteredUser, bookedClass: ClassId): Promise<Booked>;
}
