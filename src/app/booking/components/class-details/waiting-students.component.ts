import { isSameUser } from './../../../account/domain/utils';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { User } from './../../../account/domain/user';
import { Student, StudentRef } from './../../../account/domain/student';
import { PreferencesProvider, AssistState } from 'src/app/booking/services/preferences.provider';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../domain/reservation';

@Component({
  selector: 'app-waiting-students',
  templateUrl: './waiting-students.component.html',
  styleUrls: ['./waiting-students.component.scss'],
})
export class WaitingStudentsComponent implements OnInit {
  @Input()
  waitingBookings: Booking[];
  @Input()
  preferencesProvider?: PreferencesProvider;

  @Output()
  unbook = new EventEmitter<Booking>();

  private assists: Array<{student: StudentRef, state: AssistState}> = [];
  private loading = false;

  async ngOnInit() {
    if (!this.preferencesProvider) {
      return;
    }
    this.loading = true;
    const students = this.waitingBookings.map((b) => b.student);
    const promises = students.map((s) => this.preferencesProvider.getAssistState(s));
    const states = await Promise.all(promises);
    for (let i = 0 ; i < students.length ; i++) {
      this.assists.push({student: students[i], state: states[i]});
    }
    this.loading = false;
  }

  isLoading(student: StudentRef): boolean {
    return this.loading;
  }

  getAssistState(student: StudentRef): AssistState {
    const pair = this.assists.find((a) => isSameUser(a.student, student));
    if (!pair) {
      return null;
    }
    return pair.state;
  }
}
