import { first } from 'rxjs/operators';
import { ServerConfig } from './../../../../environments/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnregisteredUser } from './../../domain/unregistered';
import { Student, Preferences } from './../../domain/student';
import { User, isUnknown, isUnregisteredUser } from './../../domain/user';
import { PreferencesService } from '../preferences.service';

@Injectable()
export class RestPreferencesService implements PreferencesService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) {}

  async getPreferences(user: User | Student | UnregisteredUser): Promise<Preferences | null> {
    if (isUnknown(user)) {
      return null;
    }
    if (isUnregisteredUser(user)) {
      return null;
    }
    const userInfo = await this.http.get<User>(`${this.serverConfig.url}/users/${(user as User).id}`)
            .pipe(first())
            .toPromise();
    return (userInfo as Student).preferences || null;
  }
}
