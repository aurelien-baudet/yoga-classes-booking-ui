import { ApplicationError, matchesErrorCode } from './../../../booking/domain/general';
import { Teacher } from './../../domain/teacher';
import { UnregisteredUser } from './../../domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/account/domain/user';
import { Injectable } from '@angular/core';
import { UserId, User } from '../../domain/user';
import { AccountService } from './../account.service';
import { ServerConfig } from 'src/environments/config';
import { first } from 'rxjs/operators';
import { AuthenticationStorage } from '../authentication.storage';
import { Student, StudentRegistration } from '../../domain/student';
import { Subject } from 'rxjs';
import { UnregisteredUserInfoStorage } from '../unregistered-user-info.storage';


@Injectable({
  providedIn: 'root'
})
export class RestAccountService implements AccountService {
  readonly currentUser$ = new Subject<User | UnregisteredUser | null>();

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig,
              private authenticationStorage: AuthenticationStorage,
              private unregisteredUserStorage: UnregisteredUserInfoStorage) {}

  async registerStudent(student: StudentRegistration): Promise<Student> {
    try {
      await this.unregisteredUserStorage.clear();
      const user = await this.http.post<Student>(`${this.serverConfig.url}/users/students`, student)
        .pipe(first())
        .toPromise();
      await this.authenticationStorage.store(btoa(`${student.credentials.login}:${student.credentials.password}`));
      this.currentUser$.next(user);
      return user;
    } catch (e) {
      if (matchesErrorCode(e, 'LOGIN_ALREADY_USED')) {
        throw new ApplicationError('LOGIN_ALREADY_USED', 'Login already used', e);
      }
      throw e;
    }
  }

  async login(login: string, password: string): Promise<User> {
    try {
      await this.authenticationStorage.store(btoa(`${login}:${password}`));
      const user = await this.http.get<User>(`${this.serverConfig.url}/users`)
        .pipe(first())
        .toPromise();
      this.currentUser$.next(user);
      return user;
    } catch (e) {
      await this.authenticationStorage.clear();
      if (e.status === 401) {
        throw new ApplicationError('LOGIN_FAILED', `Failed to authenticate user ${login}`, e);
      }
      throw e;
    }
  }

  async logout(): Promise<void> {
    await this.authenticationStorage.clear();
    await this.unregisteredUserStorage.clear();
    this.currentUser$.next(null);
  }

  async getUserInfo(): Promise<User | UnregisteredUser | null> {
    try {
      const unregisteredUser = await this.unregisteredUserStorage.get();
      if (unregisteredUser) {
        return unregisteredUser;
      }
      const user = await this.http.get<User>(`${this.serverConfig.url}/users`)
        .pipe(first())
        .toPromise();
      this.currentUser$.next(user);
      return user;
    } catch (e) {
      if (e.status === 401) {
        this.currentUser$.next(null);
        return null;
      }
      throw e;
    }
  }

  async getTeacherInfo(): Promise<Teacher | null> {
    const teacher = await this.http.get<Teacher>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise();
    this.currentUser$.next(teacher);
    return teacher;
  }

  async saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void> {
    this.unregisteredUserStorage.store(user);
    this.currentUser$.next(user);
  }

  async isLoginAvailable(login: string): Promise<boolean> {
    // TODO: use observables to prevent too many requests ?
    return await this.http.get<boolean>(`${this.serverConfig.url}/users/login`, {params: {available: login}})
      .pipe(first())
      .toPromise();
  }
}
