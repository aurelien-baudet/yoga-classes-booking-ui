import { User } from './user';

export interface Teacher extends User {

}

export type TeacherId = Pick<Teacher, 'id'>;

export type TeacherInfo = Pick<Teacher, 'id' | 'displayName'>;
