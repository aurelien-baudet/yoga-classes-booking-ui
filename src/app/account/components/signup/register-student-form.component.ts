import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ApplicationError, ErrorCode, matchesErrorCode } from './../../../booking/domain/general';
import { Student, StudentRegistration } from 'src/app/account/domain/student';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy } from '@angular/core';
import { DeepPartial } from '../../../common/util/partial';

const defaultModel = (): StudentRegistration => ({
  displayName: '',
  credentials: {
    login: '',
    password: ''
  },
  contact: {
    email: '',
    phoneNumber: ''
  },
  preferences: {
    visibleByOtherStudents: true,
    agreesToBeAssisted: true,
    addBookedClassesToCalendar: true
  }
});

@Component({
  selector: 'app-register-student-form',
  templateUrl: './register-student-form.component.html',
  styleUrls: ['./register-student-form.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Input()
  errors: ApplicationError[];
  @Input()
  set newStudent(newStudent: DeepPartial<StudentRegistration>) {
    if (newStudent) {
      this.student = {
        displayName: newStudent.displayName || defaultModel().displayName,
        credentials: {
          ...defaultModel().credentials,
          ...newStudent.credentials
        },
        contact: {
          ...defaultModel().contact,
          ...newStudent.contact
        },
        preferences: {
          ...defaultModel().preferences,
          ...newStudent.preferences
        }
      };
    } else {
      this.student = defaultModel();
    }
  }

  @Output()
  register = new EventEmitter<StudentRegistration>();
  @Output()
  change = new EventEmitter<any>();

  @ViewChild('form', { static: true })
  ngForm: NgForm;

  student: StudentRegistration = defaultModel();


  private formChangesSubscription: Subscription;

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe((values) => {
      this.change.emit(values);
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }
}
