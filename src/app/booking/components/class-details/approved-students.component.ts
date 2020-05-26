import { UnregisteredUser } from './../../../account/domain/unregistered';
import { User, isSameUser } from './../../../account/domain/user';
import { Student, StudentInfo } from './../../../account/domain/student';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Booking } from '../../domain/reservation';
import { PreferencesProvider, AssistState } from 'src/app/booking/services/preferences.provider';

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

  private assists: Array<{student: Student | User | UnregisteredUser, state: AssistState}> = [];

  ngOnInit() {
    if (!this.preferencesProvider) {
      return;
    }
    this.approvedBookings
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
