import { ScheduledClass, Booking } from './../../booking/domain/reservation';
import { User, Account, Credentials, isRegisteredUser, isUnregisteredUser } from './user';
import { UnregisteredUser, isSameUnregisteredUser } from './unregistered';

export interface Student extends User {
    contactInfo: ContactInfo;
    preferences: Preferences;
}

export type StudentId = Pick<Student, 'id'>;

export type StudentInfo = Pick<Student, 'id' | 'displayName'>;

// export type StudentRegistration = Omit<Student, 'id' | 'account'> & {account: AccountRegistration};

export interface StudentRegistration {
    displayName: string;
    credentials: Credentials;
    contact: ContactInfo;
    preferences: Preferences;
}

export interface ContactInfo {
    email?: string;
    phoneNumber?: string;
}

export interface Preferences {
    visibleByOtherStudents: boolean;
    agreesToBeAssisted: boolean;
    addBookedClassesToCalendar: boolean;
}


export const isBookedForRegisteredStudent = (booking: Booking, student: StudentId) => {
    if (isRegisteredUser(booking.student)) {
        return (booking.student as StudentInfo).id === student.id;
    }
    return false;
}
export const isBookedForRegisteredStudentPredicate = (student: StudentId) =>
    (booking: Booking) => isBookedForRegisteredStudent(booking, student);

export const isBookedForUnregisteredStudent = (booking: Booking, student: UnregisteredUser) => {
    if (isRegisteredUser(student)) {
        return false;
    }
    if (isRegisteredUser(booking.student)) {
        return false;
    }
    return isSameUnregisteredUser(booking.student as UnregisteredUser, student);
};
export const isBookedForUnregisteredStudentPredicate = (student: UnregisteredUser) =>
    (booking: Booking) => isBookedForUnregisteredStudent(booking, student);


export const isBookedForStudent = (booking: Booking, student: StudentId | UnregisteredUser) => {
    if (isRegisteredUser(student)) {
        return isBookedForRegisteredStudent(booking, student as StudentId);
    }
    if (isUnregisteredUser(student)) {
        return isBookedForUnregisteredStudent(booking, student as UnregisteredUser);
    }
    return false;
};
export const isBookedForStudentPredicate = (student: StudentId | UnregisteredUser) =>
    (booking: Booking) => {
        if (isRegisteredUser(student)) {
            return isBookedForRegisteredStudent(booking, student as StudentId);
        }
        return isBookedForUnregisteredStudent(booking, student as UnregisteredUser);
    };
