import { isUnknown, isUnregisteredUser } from './../../domain/utils';
import { first } from 'rxjs/operators';
import { ServerConfig } from './../../../../environments/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnregisteredUser, UnregisteredUserPreferences } from './../../domain/unregistered';
import { Student, Preferences, StudentRef } from './../../domain/student';
import { User } from './../../domain/user';
import { PreferencesService } from '../preferences.service';

@Injectable()
export class RestPreferencesService implements PreferencesService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) {}

  async getPreferences(user: StudentRef): Promise<Preferences | UnregisteredUserPreferences | null> {
    if (isUnknown(user)) {
      return null;
    }
    if (isUnregisteredUser(user)) {
      const unregisteredPrefs = await this.http.get<UnregisteredUserPreferences>(`${this.serverConfig.url}/users/unregistered/${user.id}/preferences`)
        .pipe(first())
        .toPromise();
      return unregisteredPrefs;
    }
    const preferences = await this.http.get<Preferences>(`${this.serverConfig.url}/users/${user.id}/preferences`)
            .pipe(first())
            .toPromise();
    return preferences;
  }
}
