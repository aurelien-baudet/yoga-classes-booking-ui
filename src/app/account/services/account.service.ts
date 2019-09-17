import { Teacher } from 'src/app/account/domain/teacher';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Injectable } from '@angular/core';
import { UserId, User } from '../domain/user';
import { Student, StudentRegistration } from '../domain/student';
import { Subject } from 'rxjs';


export abstract class AccountService {
  readonly currentUser$: Subject<User | UnregisteredUser | null>;
  async abstract registerStudent(student: StudentRegistration): Promise<Student>;
  async abstract login(login: string, password: string): Promise<User>;
  async abstract logout(): Promise<void>;
  async abstract getUserInfo(): Promise<User | UnregisteredUser | null>;
  async abstract saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void>;
  async abstract getTeacherInfo(): Promise<Teacher | null>;
  async abstract isLoginAvailable(login: string): Promise<boolean>;
}
