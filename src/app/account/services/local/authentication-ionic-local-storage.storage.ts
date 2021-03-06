import { Authentication } from '../authentication.storage';
import { Injectable } from '@angular/core';
import { AuthenticationStorage } from '../authentication.storage';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthenticationIonicLocalStorage implements AuthenticationStorage {
    constructor(private storage: Storage) { }

    async store(authentication: Authentication): Promise<void> {
        await this.storage.set('auth', authentication);
    }

    async clear(): Promise<void> {
        await this.storage.remove('auth');
    }

    async get(): Promise<Authentication> {
        return await this.storage.get('auth');
    }
}