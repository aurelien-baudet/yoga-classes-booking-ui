import { Instant } from './general';
import { User, UserInfo } from 'src/app/account/domain/user';
import { Student, StudentInfo, isBookedForStudentPredicate, StudentId, isBookedForUnregisteredStudentPredicate, isBookedForRegisteredStudentPredicate } from 'src/app/account/domain/student';
import { Teacher, TeacherInfo, TeacherId } from 'src/app/account/domain/teacher';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    maxStudents: number;
    photos: Image[];
    place: Place;
    placeChanged: boolean;
    teacher: TeacherInfo;
}

export type NewLesson = Pick<Lesson, 'title' | 'description' | 'maxStudents' | 'photos'> & {
    place: PlaceId,
    teacher: TeacherId
};

export type UpdatedLesson = Pick<Lesson, 'id' | 'title' | 'description' | 'maxStudents' | 'photos'> & {
    place: PlaceId,
    teacher: TeacherId
};



export type LessonId = Pick<Lesson, 'id'>;

export interface Image {
    url: string;
    type: string;
    size: string;
}

export interface Place {
    id: string;
    name: string;
    address: string;
    maps: Image[];
}

export type PlaceId = Pick<Place, 'id'>;


export enum ClassStateTypes {
    OPENED = 'Opened',
    CANCELED = 'Canceled',
}

export interface ClassState {
    type: ClassStateTypes;
    message?: string;
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

export interface CancelInfo {
    message: string;
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

export interface BookingForFriend {
    bookedClass: ScheduledClass;
    friend: UserInfo;
}

export interface UnbookingForFriend {
    bookedClass: ScheduledClass;
    booking: Booking;
}

export type ClassId = Pick<ScheduledClass, 'id'>;

export const isCanceled = (c: ScheduledClass) => c.state.type === ClassStateTypes.CANCELED;

export const isSameLesson = (a: Lesson | LessonId, b: Lesson | LessonId) => a.id === b.id;
export const sameLessonPredicate = (a: Lesson | LessonId) => (b: Lesson | LessonId) => isSameLesson(a, b);

export const isSameClass = (a: ScheduledClass, b: ScheduledClass) => a.id === b.id;
export const sameClassPredicate = (a: ScheduledClass) => (b: ScheduledClass) => isSameClass(a, b);

export const isSamePlace = (a: Place | PlaceId, b: Place | PlaceId) => a.id === b.id;
export const samePlacePredicate = (a: Place | PlaceId) => (b: Place | PlaceId) => isSamePlace(a, b);

export const bookingApprovedForStudent = (bookedClass: ScheduledClass, student: StudentId) =>
    bookedClass.bookings.approved.some(isBookedForStudentPredicate(student));
export const bookingInWaitingListForStudent = (bookedClass: ScheduledClass, student: StudentId) =>
    bookedClass.bookings.waiting.some(isBookedForStudentPredicate(student));


export const bookingApprovedForRegisteredStudent = (bookedClass: ScheduledClass, student: StudentId) =>
    bookedClass.bookings.approved.some(isBookedForRegisteredStudentPredicate(student));

export const bookingApprovedForUnregisteredStudent = (bookedClass: ScheduledClass, student: UnregisteredUser) =>
    bookedClass.bookings.approved.some(isBookedForUnregisteredStudentPredicate(student));
