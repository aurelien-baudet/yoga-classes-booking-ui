import { Instant } from './general';
import { User, UserInfo } from 'src/app/account/domain/user';
import { Student, StudentInfo, isBookedForStudent, isBookedForStudentPredicate, StudentId, isBookedForUnregisteredStudentPredicate, isBookedForRegisteredStudentPredicate } from 'src/app/account/domain/student';
import { Teacher, TeacherInfo } from 'src/app/account/domain/teacher';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    maxStudents: number;
    photos: string[];
    place: Place;
    teacher: TeacherInfo;
}

export type LessonId = Pick<Lesson, 'id'>;

export interface Place {
    id: string;
    name: string;
    address: string;
    plan: string;
}

export type PlaceId = Pick<Place, 'id'>;


export enum ClassState {
    OPENED,
    CANCELED
}

export interface Booking {
    bookDate: number;
    bookedBy: UserInfo;
    student: StudentInfo | UnregisteredUser;
}

export interface ScheduledClass {
    id: string;
    start: Instant;
    end: Instant;
    state: ClassState;
    lesson: Lesson;
    bookings: Bookings;
}

export interface Bookings {
    all: Booking[];
    approved: Booking[];
    waiting: Booking[];
}

export interface Booked {
    bookedClass: ScheduledClass;
    approved: boolean;
}

export type ClassId = Pick<ScheduledClass, 'id'>;

export const isSameClass = (a: ScheduledClass, b: ScheduledClass) => a.id === b.id;
export const sameClassPredicate = (a: ScheduledClass) => (b: ScheduledClass) => isSameClass(a, b);

export const approvedForStudent = (bookedClass: ScheduledClass, student: StudentId) =>
    bookedClass.bookings.approved.some(isBookedForStudentPredicate(student));


export const approvedForRegsiteredStudent = (bookedClass: ScheduledClass, student: StudentId) =>
    bookedClass.bookings.approved.some(isBookedForRegisteredStudentPredicate(student));

export const approvedForUnregisteredStudent = (bookedClass: ScheduledClass, student: UnregisteredUser) =>
    bookedClass.bookings.approved.some(isBookedForUnregisteredStudentPredicate(student));
