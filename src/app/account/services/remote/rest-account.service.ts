import { isSameUser } from './../../domain/utils';
import { ApplicationError, matchesErrorCode } from './../../../booking/domain/general';
import { Teacher, TeacherRegistration } from './../../domain/teacher';
import { UnregisteredUser, UnregisteredUserRegistration } from './../../domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/account/domain/user';
import { Injectable } from '@angular/core';
import { UserId, User } from '../../domain/user';
import { AccountService } from './../account.service';
import { ServerConfig } from 'src/environments/config';
import { first } from 'rxjs/operators';
import { AuthenticationStorage } from '../authentication.storage';
import { Student, StudentRegistration, Profile, StudentId } from '../../domain/student';
import { Subject, ReplaySubject } from 'rxjs';
import { UnregisteredUserInfoStorage } from '../unregistered-user-info.storage';


@Injectable({
  providedIn: 'root'
})
export class RestAccountService implements AccountService {
  private currentUser: User | UnregisteredUser | null;
  readonly currentUser$ = new ReplaySubject<User | UnregisteredUser | null>(1);

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig,
              private authenticationStorage: AuthenticationStorage,
              private unregisteredUserStorage: UnregisteredUserInfoStorage) {}

  async registerStudent(student: StudentRegistration): Promise<Student> {
    try {
      await this.unregisteredUserStorage.clear();
      const user = Student.from(await this.http.post<Student>(`${this.serverConfig.url}/users/students`, student)
        .pipe(first())
        .toPromise());
      await this.authenticationStorage.store(btoa(`${student.credentials.login}:${student.credentials.password}`));
      this.updateCurrentUser(user);
      return user;
    } catch (e) {
      if (matchesErrorCode(e, 'LOGIN_ALREADY_USED')) {
        throw new ApplicationError('LOGIN_ALREADY_USED', 'Login already used', e);
      }
      throw e;
    }
  }

  async registerTeacher(teacher: TeacherRegistration): Promise<Teacher> {
    try {
      return Teacher.from(await this.http.post<Teacher>(`${this.serverConfig.url}/users/teachers`, teacher)
        .pipe(first())
        .toPromise());
    } catch (e) {
      if (matchesErrorCode(e, 'LOGIN_ALREADY_USED')) {
        throw new ApplicationError('LOGIN_ALREADY_USED', 'Login already used', e);
      }
      throw e;
    }
  }

  async login(login: string, password: string): Promise<User> {
    try {
      await this.unregisteredUserStorage.clear();
      await this.authenticationStorage.store(btoa(`${login}:${password}`));
      const user = User.from(await this.http.get<User>(`${this.serverConfig.url}/users`)
        .pipe(first())
        .toPromise());
      this.updateCurrentUser(user);
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
    this.updateCurrentUser(null);
  }

  async getUserInfo(): Promise<User | UnregisteredUser | null> {
    try {
      const unregisteredUser = UnregisteredUser.from(await this.unregisteredUserStorage.get());
      if (unregisteredUser) {
        this.updateCurrentUser(unregisteredUser);
        return unregisteredUser;
      }
      const user = User.from(await this.http.get<User>(`${this.serverConfig.url}/users`)
        .pipe(first())
        .toPromise());
      this.updateCurrentUser(user);
      return user;
    } catch (e) {
      if (e.status === 401) {
        this.updateCurrentUser(null);
        return null;
      }
      throw e;
    }
  }

  async getTeacherInfo(): Promise<Teacher | null> {
    const teacher = Teacher.from(await this.http.get<Teacher>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise());
    this.updateCurrentUser(teacher);
    return teacher;
  }

  async saveUnregisterdUserInfo(user: UnregisteredUserRegistration): Promise<void> {
    const unregistered = UnregisteredUser.from(await this.http.post<UnregisteredUser>(`${this.serverConfig.url}/users/unregistered`, user)
      .pipe(first())
      .toPromise());
    this.unregisteredUserStorage.store(unregistered);
    this.updateCurrentUser(unregistered);
  }

  async isLoginAvailable(login: string): Promise<boolean> {
    // TODO: use observables to prevent too many requests ?
    return await this.http.get<boolean>(`${this.serverConfig.url}/users/login`, {params: {available: login}})
      .pipe(first())
      .toPromise();
  }

  async listTeachers(): Promise<Teacher[]> {
    return (await this.http.get<Teacher[]>(`${this.serverConfig.url}/users/teachers`)
      .pipe(first())
      .toPromise())
      .map(Teacher.from);
  }

  async updateProfile(student: StudentId, profile: Profile): Promise<Student> {
    const user = Student.from(await this.http.patch<Student>(`${this.serverConfig.url}/users/students/${student.id}`, profile)
      .pipe(first())
      .toPromise());
    this.updateCurrentUser(user);
    return user;
  }

  private updateCurrentUser(user: User | UnregisteredUser) {
    console.log('[rest-account-service] updateCurrentUser', user, this.currentUser);
    if (!isSameUser(user, this.currentUser)) {
      console.log('[rest-account-service] updateCurrentUser:different user', user);
      this.currentUser$.next(user);
    }
    this.currentUser = user;
  }
}
