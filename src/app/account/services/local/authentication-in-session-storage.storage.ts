import { Authentication } from './../authentication.storage';
import { Injectable } from '@angular/core';
import { AuthenticationStorage } from '../authentication.storage';

@Injectable()
export class AuthenticationInSessionStorage implements AuthenticationStorage {
    async store(authentication: Authentication): Promise<void> {
        sessionStorage.setItem('auth', authentication);
    }

    async clear(): Promise<void> {
        sessionStorage.removeItem('auth');
    }

    async get(): Promise<Authentication> {
        return sessionStorage.getItem('auth');
    }
}