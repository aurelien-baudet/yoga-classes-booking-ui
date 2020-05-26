import { UnregisteredUser } from './../../../account/domain/unregistered';
import { User, isSameUser } from './../../../account/domain/user';
import { Student, StudentInfo } from './../../../account/domain/student';
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

  private assists: Array<{student: Student | User | UnregisteredUser, state: AssistState}> = [];

  ngOnInit() {
    if (!this.preferencesProvider) {
      return;
    }
    this.waitingBookings
      .map((b) => b.student)
      .forEach((student) => {
        this.assists.push({student, state: this.preferencesProvider.getAssistState(student)});
      });
  }

  isLoading(student: StudentInfo | UnregisteredUser) {
    return this.getAssistState(student) === null;
  }

  getAssistState(student: StudentInfo | UnregisteredUser) {
    return this.assists.find((a) => isSameUser(a.student, student));
  }
}
