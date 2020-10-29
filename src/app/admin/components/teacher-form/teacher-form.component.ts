import { TeacherRegistration } from './../../../account/domain/teacher';
import { ErrorCode, matchesErrorCode } from './../../../booking/domain/general';
import { ApplicationError } from 'src/app/booking/domain/general';
import { DeepPartial } from './../../../common/util/partial';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


const defaultModel = (): TeacherRegistration => ({
  displayName: '',
  credentials: {
    login: '',
    password: ''
  },
  contact: {
    email: '',
    phoneNumber: ''
  }
});

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
})
export class TeacherFormComponent {
  @Input()
  errors: ApplicationError[];
  @Input()
  set teacher(newTeacher: DeepPartial<TeacherRegistration>) {
    if (newTeacher) {
      this.teacherModel = {
        displayName: newTeacher.displayName || defaultModel().displayName,
        credentials: {
          ...defaultModel().credentials,
          ...newTeacher.credentials
        },
        contact: {
          ...defaultModel().contact,
          ...newTeacher.contact
        }
      };
    } else {
      this.teacherModel = defaultModel();
    }
  }
  @Input()
  submitText = 'Ajouter';

  @Output()
  register = new EventEmitter<TeacherRegistration>();

  teacherModel: TeacherRegistration = defaultModel();


  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }
}
