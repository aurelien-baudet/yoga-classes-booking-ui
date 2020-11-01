import { TeacherRegistration } from './../domain/teacher';
import { UnregisteredUserRegistration } from './../domain/unregistered';
import { Teacher } from 'src/app/account/domain/teacher';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Injectable } from '@angular/core';
import { UserId, User } from '../domain/user';
import { Student, StudentRegistration, Profile, StudentId } from '../domain/student';
import { Subject } from 'rxjs';


export abstract class AccountService {
  readonly currentUser$: Subject<User | UnregisteredUser | null>;
  async abstract registerStudent(student: StudentRegistration): Promise<Student>;
  async abstract registerTeacher(teacher: TeacherRegistration): Promise<Teacher>;
  async abstract login(login: string, password: string): Promise<User>;
  async abstract logout(): Promise<void>;
  async abstract getUserInfo(): Promise<User | UnregisteredUser | null>;
  async abstract saveUnregisterdUserInfo(user: UnregisteredUserRegistration): Promise<void>;
  async abstract getTeacherInfo(): Promise<Teacher | null>;
  async abstract isLoginAvailable(login: string): Promise<boolean>;
  async abstract listTeachers(): Promise<Teacher[]>;
  async abstract updateProfile(student: StudentId, profile: Profile): Promise<Student>;
}
