import { UnregisteredUser } from './../../../account/domain/unregistered';
import { StudentInfo } from './../../../account/domain/student';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  @Input()
  student: StudentInfo | UnregisteredUser;
  @Input()
  displayAssistInfo = false;
  @Input()
  loading = true;
  @Input()
  assist: boolean | null;

  @Output()
  unbook = new EventEmitter<StudentInfo | UnregisteredUser>();

  getIcon(): string {
    if (this.assist === null) {
      return 'app-assist-unknown';
    }
    return this.assist ? 'app-assist-accepted' : 'app-assist-refused';
  }
}
