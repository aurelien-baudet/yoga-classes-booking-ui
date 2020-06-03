import { isUnknown, isUnregisteredUser } from './../../../account/domain/utils';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { User } from './../../../account/domain/user';
import { Student, StudentRef } from './../../../account/domain/student';
import { PreferencesProvider, AssistState } from 'src/app/booking/services/preferences.provider';
import { PreferencesService } from 'src/app/account/services/preferences.service';

export class AccountPreferencesProvider implements PreferencesProvider {
  constructor(private preferencesService: PreferencesService) {}

  private loadings: Array<StudentRef> = [];
  private states: Array<{student: StudentRef, state: AssistState}> = [];

  async getAssistState(student: StudentRef): Promise<AssistState> {
    const agrees = await this.agreesToBeAssisted(student);
    let state;
    if (agrees === null) {
      state = AssistState.Unknown;
    } else if (agrees) {
      state = AssistState.Accepted;
    } else {
      state = AssistState.Refused;
    }
    console.error('state', student.displayName, state);
    return state;
  }


  private async agreesToBeAssisted(student: StudentRef): Promise<boolean | null> {
    if (isUnknown(student)) {
      return null;
    }
    if (isUnregisteredUser(student)) {
      return null;
    }
    const preferences = await this.preferencesService.getPreferences(student);
    console.error('preferences', student.displayName, preferences);
    if (preferences === null) {
      return null;
    }
    return preferences.agreesToBeAssisted;
  }

}
