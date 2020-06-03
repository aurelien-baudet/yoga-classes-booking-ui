import { StudentRef } from './../../account/domain/student';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { User } from 'src/app/account/domain/user';
import { Student } from 'src/app/account/domain/student';


export enum AssistState {
  Unknown,
  Accepted,
  Refused
}

export abstract class PreferencesProvider {
  abstract async getAssistState(student: StudentRef): Promise<AssistState>;
}
