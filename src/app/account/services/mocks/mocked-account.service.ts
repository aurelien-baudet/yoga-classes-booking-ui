import { UnregisteredUser } from './../../domain/unregistered';
import { Role } from 'src/app/account/domain/user';
import { Injectable } from '@angular/core';
import { UserId, User } from '../../domain/user';
import { AccountService } from '../account.service';
import { Student, StudentRegistration } from '../../domain/student';


@Injectable({
  providedIn: 'root'
})
export class MockedAccountService implements AccountService {
  saveUnregisterdUserInfo(user: UnregisteredUser): Promise<void> {
    throw new Error("Method not implemented.");
  }

  registerStudent(student: StudentRegistration): Promise<Student> {
    throw new Error("Method not implemented.");
  }
  
  login(login: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getUserInfo(): Promise<User> {
    return Promise.resolve({
      id: '1',
      displayName: 'Aurélien',
      account: {
        login: 'fdjkqfh',
        roles: [Role.STUDENT]
      }
    });
  }
}
