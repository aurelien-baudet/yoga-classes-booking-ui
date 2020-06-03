import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssistState, PreferencesProvider } from 'src/app/booking/services/preferences.provider';
import { Booking } from '../../domain/reservation';
import { StudentRef } from './../../../account/domain/student';
import { isSameUser } from './../../../account/domain/utils';

@Component({
  selector: 'app-approved-students',
  templateUrl: './approved-students.component.html',
  styleUrls: ['./approved-students.component.scss'],
})
export class ApprovedStudentsComponent implements OnInit {
  @Input()
  approvedBookings: Booking[];
  @Input()
  maxStudents: number;
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
    const students = this.approvedBookings.map((b) => b.student);
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
