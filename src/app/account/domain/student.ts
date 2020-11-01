import { ContactInfo } from './contact';
import { User, Credentials } from './user';

export interface Student extends User {
    preferences: Preferences;
}
export class Student extends User implements Student {
    constructor(student: Student) {
        super(student);
        this.preferences = student.preferences;
    }

    static from(student?: Student) {
        return student ? new Student(student) : student;
    }
}

export type StudentId = Pick<Student, 'id'>;

export interface StudentRef {
    id: string;
    displayName: string;
    registered: boolean;
}

// export type StudentRegistration = Omit<Student, 'id' | 'account'> & {account: AccountRegistration};

export interface StudentRegistration {
    displayName: string;
    credentials: Credentials;
    contact: ContactInfo;
    preferences: Preferences;
}


export interface Preferences {
    visibleByOtherStudents: boolean;
    agreesToBeAssisted: boolean;
    addBookedClassesToCalendar: boolean;
}

export interface Profile {
    displayName: string;
    contact: ContactInfo;
}
