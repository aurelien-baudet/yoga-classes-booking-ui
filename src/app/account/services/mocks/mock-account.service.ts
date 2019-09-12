import { Teacher } from '../../domain/teacher';
import { UnregisteredUser } from '../../domain/unregistered';
import { Injectable } from '@angular/core';
import { UserId, User } from '../../domain/user';
import { AccountService } from '../account.service';
import { Student, StudentRegistration } from '../../domain/student';
import * as pouet from './data/student-pouet.json';
import * as cyril from './data/teacher-cyril.json';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAccountService implements AccountService {
  readonly currentUser$ = new ReplaySubject<User | UnregisteredUser | null>();

  constructor() {}

  async registerStudent(student: StudentRegistration): Promise<Student> {
    throw new Error('not implemented');
  }

  async login(login: string, password: string): Promise<User> {
    throw new Error('not implemented');
  }

  async logout(): Promise<void> {
    this.currentUser$.next(null);
  }

  async getUserInfo(): Promise<User | UnregisteredUser | null> {
    console.log('getUserInfo', pouet);
    const user = pouet['default'];
    this.currentUser$.next(user);
    return user;
  }

  async getTeacherInfo(): Promise<Teacher | null> {
    console.log('getTeacherInfo', cyril);
    const teacher = cyril['default'] as any;
    this.currentUser$.next(teacher);
    return teacher;
  }

  async saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void> {
    throw new Error('not implemented');
  }
}
