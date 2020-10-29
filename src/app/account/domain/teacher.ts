import { ContactInfo } from './contact';
import { User, Credentials } from './user';

export interface Teacher extends User {

}
export class Teacher extends User implements Teacher {
  constructor(teacher: Teacher) {
    super(teacher);
  }

  static from(teacher?: Teacher) {
    return teacher ? new Teacher(teacher) : teacher;
  }
}

export type TeacherId = Pick<Teacher, 'id'>;

export type TeacherInfo = Pick<Teacher, 'id' | 'displayName'>;

export const isSameTeacher = (a: Teacher | TeacherId | TeacherInfo, b: Teacher | TeacherId | TeacherInfo) => {
  return a.id === b.id;
};

export interface TeacherRegistration {
  displayName: string;
  credentials: Credentials;
  contact: ContactInfo;
}

