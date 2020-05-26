import { UnregisteredUser } from './../domain/unregistered';
import { Student, Preferences } from './../domain/student';
import { User } from './../domain/user';


export abstract class PreferencesService {
  abstract async getPreferences(user: User | Student | UnregisteredUser): Promise<Preferences | null>;
}
