import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Injectable } from '@angular/core';
import { UserId, User } from '../domain/user';
import { Student, StudentRegistration } from '../domain/student';


export abstract class AccountService {
  async abstract registerStudent(student: StudentRegistration): Promise<Student>;
  async abstract login(login: string, password: string): Promise<User>;
  async abstract logout(): Promise<void>;
  async abstract getUserInfo(): Promise<User | UnregisteredUser | null>;
  async abstract saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void>;
}
