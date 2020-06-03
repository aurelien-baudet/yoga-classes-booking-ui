import { UnregisteredUser, UnregisteredUserPreferences } from './../domain/unregistered';
import { Student, Preferences, StudentRef } from './../domain/student';
import { User, UserId } from './../domain/user';


export abstract class PreferencesService {
  abstract async getPreferences(user: StudentRef): Promise<Preferences | UnregisteredUserPreferences | null>;
}
