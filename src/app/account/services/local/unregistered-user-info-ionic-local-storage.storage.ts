import { Storage } from '@ionic/storage';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Injectable } from '@angular/core';
import { UnregisteredUserInfoStorage } from '../unregistered-user-info.storage';

@Injectable()
export class UnregisteredUserIonicLocalStorage implements UnregisteredUserInfoStorage {
  constructor(private storage: Storage) { }

  async store(user: UnregisteredUser): Promise<void> {
    await this.storage.set('unregisteredUser', JSON.stringify(user));
  }

  async clear(): Promise<void> {
    await this.storage.remove('unregisteredUser');
  }

  async get(): Promise<UnregisteredUser> {
    const value = await this.storage.get('unregisteredUser');
    return value ? JSON.parse(value) : null;
  }
}
