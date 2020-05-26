import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { User } from 'src/app/account/domain/user';
import { Student } from 'src/app/account/domain/student';


export enum AssistState {
  Unknown,
  Accepted,
  Refused
}

export abstract class PreferencesProvider {
  abstract getAssistState(student: Student | User | UnregisteredUser): AssistState | null;
}
