import { isBookedForStudentPredicate } from './../../account/domain/utils';
import { Instant } from './general';
import { User, UserInfo } from 'src/app/account/domain/user';
import { Student, StudentRef, StudentId } from 'src/app/account/domain/student';
import { Teacher, TeacherInfo, TeacherId } from 'src/app/account/domain/teacher';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';

export interface LessonDifficulty {
    sportLevel: number | null;
    postureLevel: number | null;
  }

export interface Lesson {
    id: string;
    title: string;
    description: string;
    maxStudents: number;
    difficulty: LessonDifficulty;
    photos: Image[];
    place: Place;
    placeChanged: boolean;
    teacher: TeacherInfo;
}

export type NewLesson = Pick<Lesson, 'title' | 'description' | 'maxStudents' | 'photos' | 'difficulty'> & {
    place: PlaceId,
    teacher: TeacherId
};

export type UpdatedLesson = Pick<Lesson, 'id' | 'title' | 'description' | 'maxStudents' | 'photos' | 'difficulty'> & {
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
    student: StudentRef;
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

export class SportLevel {
    static readonly Level1 = new SportLevel('Relaxante', 0);
    static readonly Level2 = new SportLevel('Modérée', 1);
    static readonly Level3 = new SportLevel('Tonique', 2);
    static readonly Level4 = new SportLevel('Sportive', 3);
    static readonly Level5 = new SportLevel('Extrême', 4);
    static readonly all = [SportLevel.Level1, SportLevel.Level2, SportLevel.Level3, SportLevel.Level4, SportLevel.Level5];

    private constructor(public readonly label: string, public readonly value: number) {}

    static from(labelOrValue: string | number) {
        for (const level of SportLevel.all) {
            if (level.label === labelOrValue || level.value === labelOrValue) {
                return level;
            }
        }
        throw new Error('Illegal SportLevel name or value: ' + labelOrValue);
    }

    toString() {
        return this.label;
    }
}


export class PostureLevel {
    static readonly Level1 = new PostureLevel('Fondations', 0);
    static readonly Level2 = new PostureLevel('Classiques', 1);
    static readonly Level3 = new PostureLevel('Intermédiaires', 2);
    static readonly Level4 = new PostureLevel('Intenses', 3);
    static readonly Level5 = new PostureLevel('Avancées', 4);
    static readonly all = [PostureLevel.Level1, PostureLevel.Level2, PostureLevel.Level3, PostureLevel.Level4, PostureLevel.Level5];

    private constructor(public readonly label: string, public readonly value: number) {}

    static from(labelOrValue: string | number) {
        for (const level of PostureLevel.all) {
            if (level.label === labelOrValue || level.value === labelOrValue) {
                return level;
            }
        }
        throw new Error('Illegal PostureLevel name or value: ' + labelOrValue);
    }

    toString() {
        return this.label;
    }
}


export const isCanceled = (c: ScheduledClass) => c.state.type === ClassStateTypes.CANCELED;

export const isSameLesson = (a: Lesson | LessonId, b: Lesson | LessonId) => a.id === b.id;
export const sameLessonPredicate = (a: Lesson | LessonId) => (b: Lesson | LessonId) => isSameLesson(a, b);

export const isSameClass = (a: ScheduledClass, b: ScheduledClass) => a.id === b.id;
export const sameClassPredicate = (a: ScheduledClass) => (b: ScheduledClass) => isSameClass(a, b);

export const isSamePlace = (a: Place | PlaceId, b: Place | PlaceId) => a.id === b.id;
export const samePlacePredicate = (a: Place | PlaceId) => (b: Place | PlaceId) => isSamePlace(a, b);


export const bookingApprovedForStudent = (bookedClass: ScheduledClass, student: StudentRef) =>
    bookedClass.bookings.approved.some(isBookedForStudentPredicate(student));
export const bookingInWaitingListForStudent = (bookedClass: ScheduledClass, student: StudentRef) =>
    bookedClass.bookings.waiting.some(isBookedForStudentPredicate(student));

export const hasPlaceAvailable = (scheduledClass: ScheduledClass) =>
    scheduledClass.bookings.approved.length < scheduledClass.lesson.maxStudents;
