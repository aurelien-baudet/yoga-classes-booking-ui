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
import { ReplaySubject } from 'rxjs';
import { UnregisteredUserInfoStorage } from '../unregistered-user-info.storage';


@Injectable({
  providedIn: 'root'
})
export class RestAccountService implements AccountService {
  readonly currentUser$ = new ReplaySubject<User | UnregisteredUser | null>();

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig,
              private authenticationStorage: AuthenticationStorage,
              private unregisteredUserStorage: UnregisteredUserInfoStorage) {}

  async registerStudent(student: StudentRegistration): Promise<Student> {
    const user = await this.http.post<Student>(`${this.serverConfig.url}/users/students`, student)
      .pipe(first())
      .toPromise();
    await this.unregisteredUserStorage.clear();
    await this.authenticationStorage.store(btoa(`${student.credentials.login}:${student.credentials.password}`));
    this.currentUser$.next(user);
    return user;
  }

  async login(login: string, password: string): Promise<User> {
    await this.authenticationStorage.store(btoa(`${login}:${password}`));
    const user = await this.http.get<User>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise();
    this.currentUser$.next(user);
    return user;
  }

  async logout(): Promise<void> {
    await this.authenticationStorage.clear();
    await this.unregisteredUserStorage.clear();
    this.currentUser$.next(null);
  }

  async getUserInfo(): Promise<User | UnregisteredUser | null> {
    const unregisteredUser = await this.unregisteredUserStorage.get();
    if (unregisteredUser) {
      return unregisteredUser;
    }
    const user = await this.http.get<User>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise();
    this.currentUser$.next(user);
    return user;
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
}
