import { UnregisteredUser } from './../../../account/domain/unregistered';
import { Injectable } from '@angular/core';
import { Student, StudentId } from 'src/app/account/domain/student';
import { User, UserId, Role } from 'src/app/account/domain/user';
import { ClassId, ScheduledClass, ClassState, Booking, Booked } from '../../domain/reservation';
import { BookingService } from '../booking.service';

@Injectable({
  providedIn: 'root'
})
export class MockedBookingService implements BookingService {
  constructor() { }

  async book(student: StudentId | UnregisteredUser, bookedClass: ClassId): Promise<Booked> {
    console.info("booked", bookedClass, "for", student);
    const booking: Booking = {
      bookedBy: {
        id: '1',
        displayName: 'Aurélien'
      },
      bookDate: Date.now(),
      student: {
        id: '1',
        displayName: 'Aurélien'
      }
    };
    const updatedReservation: ScheduledClass = {
      id: '1',
      start: new Date(2019, 7, 26, 18, 45).valueOf(),
      end: new Date(2019, 7, 26, 20).valueOf(),
      state: ClassState.OPENED,
      lesson: {
        id: '1',
        title: 'Lundi detox',
        description: '',
        maxStudents: 10,
        photos: [],
        place: {
          id: '1',
          name: 'Villa',
          address: 'ptit boui boui',
          plan: ''
        },
        teacher: {
          id: '1',
          displayName: 'Cyril'
        }
      },
      bookings: {
        all: [booking],
        approved: [booking],
        waiting: []
      }
    };
    return Promise.resolve({bookedClass: updatedReservation, approved: true});
  }

  async cancel(student: StudentId | UnregisteredUser, bookedClass: ClassId): Promise<ScheduledClass> {
    console.info(student, "canceled booking", bookedClass);
    return Promise.resolve(null);
  }

  async getBookedClasses(student: StudentId | UnregisteredUser): Promise<ScheduledClass[]> {
    return Promise.resolve([]);
  }
}
