import { PreferencesService } from 'src/app/account/services/preferences.service';
import { Teacher } from '../../domain/teacher';
import { UnregisteredUser, UnregisteredUserPreferences } from '../../domain/unregistered';
import { Injectable } from '@angular/core';
import { UserId, User } from '../../domain/user';
import { AccountService } from '../account.service';
import { Student, StudentRegistration, Preferences, StudentRef } from '../../domain/student';
import * as pouet from './data/student-pouet.json';
import * as cyril from './data/teacher-cyril.json';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockPreferencesService implements PreferencesService {

  constructor() {}

  async getPreferences(user: StudentRef): Promise<Preferences | UnregisteredUserPreferences | null> {
    return null;
  }

}
