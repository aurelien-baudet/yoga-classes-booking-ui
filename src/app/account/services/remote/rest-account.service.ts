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


@Injectable({
  providedIn: 'root'
})
export class RestAccountService implements AccountService {
  private unregisteredUser: UnregisteredUser;

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig,
              private authenticationStorage: AuthenticationStorage) {}

  async registerStudent(student: StudentRegistration): Promise<Student> {
    const user = await this.http.post<Student>(`${this.serverConfig.url}/users/students`, student)
      .pipe(first())
      .toPromise();
    await this.authenticationStorage.store(btoa(`${student.credentials.login}:${student.credentials.password}`));
    return user;
  }

  async login(login: string, password: string): Promise<User> {
    await this.authenticationStorage.store(btoa(`${login}:${password}`));
    const user = await this.http.get<User>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise();
    return user;
  }

  async logout(): Promise<void> {
    await this.authenticationStorage.clear();
  }

  async getUserInfo(): Promise<User | UnregisteredUser | null> {
    if (this.unregisteredUser) {
      return this.unregisteredUser;
    }
    return this.http.get<User>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise();
  }

  async getTeacherInfo(): Promise<Teacher | null> {
    return this.http.get<Teacher>(`${this.serverConfig.url}/users`)
      .pipe(first())
      .toPromise();
  }

  async saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void> {
    // TODO: use a store ?
    this.unregisteredUser = user;
  }
}
