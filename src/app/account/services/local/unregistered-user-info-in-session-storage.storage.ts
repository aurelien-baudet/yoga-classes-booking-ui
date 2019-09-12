import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Injectable } from '@angular/core';
import { UnregisteredUserInfoStorage } from '../unregistered-user-info.storage';

@Injectable()
export class UnregisteredUserInfoInSessionStorage implements UnregisteredUserInfoStorage {
  async store(user: UnregisteredUser): Promise<void> {
    sessionStorage.setItem('unregisteredUser', JSON.stringify(user));
  }

  async clear(): Promise<void> {
    sessionStorage.removeItem('unregisteredUser');
  }

  async get(): Promise<UnregisteredUser> {
    return JSON.parse(sessionStorage.getItem('unregisteredUser'));
  }
}
