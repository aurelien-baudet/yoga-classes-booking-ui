import { UnregisteredUser } from './../../../account/domain/unregistered';
import { User, isUnregisteredUser, isUnknown, isSameUser } from './../../../account/domain/user';
import { Student } from './../../../account/domain/student';
import { PreferencesProvider, AssistState } from 'src/app/booking/services/preferences.provider';
import { PreferencesService } from 'src/app/account/services/preferences.service';

export class AccountPreferencesProvider implements PreferencesProvider {
  constructor(private preferencesService: PreferencesService) {}

  private loadings: Array<Student | User | UnregisteredUser> = [];
  private states: Array<{student: Student | User | UnregisteredUser, state: AssistState}> = [];

  getAssistState(student: Student | User | UnregisteredUser): AssistState | null {
    if (this.isLoading(student)) {
      return null;
    }
    const currentState = this.getState(student);
    if (currentState !== null) {
      return currentState;
    }
    this.setLoading(student, true);
    this.setState(student, null);
    this.agreesToBeAssisted(student).then((agrees) => {
      if (agrees === null) {
        this.setState(student, AssistState.Unknown);
      } else if (agrees) {
        this.setState(student, AssistState.Accepted);
      } else {
        this.setState(student, AssistState.Refused);
      }
      this.setLoading(student, false);
    });
  }


  private isLoading(student: Student | User | UnregisteredUser): boolean {
    return this.loadings.some((s) => isSameUser(s, student));
  }

  private setLoading(student: Student | User | UnregisteredUser, loading: boolean) {
    const idx = this.loadings.findIndex((s) => isSameUser(s, student));
    if (loading) {
      if (idx < 0) {
        this.loadings.push(student);
      }
    } else {
      if (idx >= 0) {
        this.loadings.splice(idx, 1);
      }
    }
  }


  private getState(student: Student | User | UnregisteredUser): AssistState | null {
    const idx = this.states.findIndex((p) => isSameUser(p.student, student));
    if (idx >= 0) {
      return this.states[idx].state;
    }
    return null;
  }

  private setState(student: Student | User | UnregisteredUser, state: AssistState) {
    const idx = this.states.findIndex((p) => isSameUser(p.student, student));
    if (idx >= 0) {
      this.states[idx].state = state;
    } else {
      this.states.push({student, state});
    }
  }

  private async agreesToBeAssisted(student: Student | User | UnregisteredUser): Promise<boolean | null> {
    if (isUnknown(student)) {
      return null;
    }
    if (isUnregisteredUser(student)) {
      return null;
    }
    const preferences = await this.preferencesService.getPreferences(student);
    if (preferences === null) {
      return null;
    }
    return preferences.agreesToBeAssisted;
  }

}
