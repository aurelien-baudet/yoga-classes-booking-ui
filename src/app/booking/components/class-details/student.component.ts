import { AssistState } from 'src/app/booking/services/preferences.provider';
import { UnregisteredUser } from './../../../account/domain/unregistered';
import { StudentRef } from './../../../account/domain/student';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  @Input()
  student: StudentRef;
  @Input()
  displayAssistInfo = false;
  @Input()
  loading = true;
  @Input()
  assist: AssistState;

  @Output()
  unbook = new EventEmitter<StudentRef>();

  getIcon(): string {
    if (this.isRefused()) {
      return 'app-assist-refused';
    }
    if (this.isAccepted()) {
      return 'app-assist-accepted';
    }
    return 'app-assist-unknown';
  }

  isAccepted() {
    return this.assist === AssistState.Accepted;
  }

  isRefused() {
    return this.assist === AssistState.Refused;
  }

  isUnknown() {
    return this.assist === AssistState.Unknown;
  }
}
