import { Teacher } from '../../domain/teacher';
import { UnregisteredUser } from '../../domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/account/domain/user';
import { Injectable } from '@angular/core';
import { UserId, User } from '../../domain/user';
import { AccountService } from '../account.service';
import { ServerConfig } from 'src/environments/config';
import { first } from 'rxjs/operators';
import { AuthenticationStorage } from '../authentication.storage';
import { Student, StudentRegistration } from '../../domain/student';
import * as pouet from './data/student-pouet.json';
import * as cyril from './data/teacher-cyril.json';

@Injectable({
  providedIn: 'root'
})
export class MockAccountService implements AccountService {
  constructor() {}

  async registerStudent(student: StudentRegistration): Promise<Student> {
    throw new Error('not implemented');
  }

  async login(login: string, password: string): Promise<User> {
    throw new Error('not implemented');
  }

  async logout(): Promise<void> {
    throw new Error('not implemented');
  }

  async getUserInfo(): Promise<User | UnregisteredUser | null> {
    console.log('getUserInfo', pouet);
    return pouet['default'];
  }

  async getTeacherInfo(): Promise<Teacher | null> {
    console.log('getTeacherInfo', cyril);
    return cyril['default'] as any;
  }

  async saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void> {
    throw new Error('not implemented');
  }
}
