import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ApplicationError, ErrorCode, matchesErrorCode } from './../../../booking/domain/general';
import { ContactInfo } from './../../domain/student';
import { Student, StudentRegistration } from 'src/app/account/domain/student';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register-student-form',
  templateUrl: './register-student-form.component.html',
  styleUrls: ['./register-student-form.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Input()
  errors: ApplicationError[];

  @Output()
  register = new EventEmitter<StudentRegistration>();
  @Output()
  change = new EventEmitter<any>();

  student: StudentRegistration = {
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
  };

  @ViewChild('form', { static: true })
  ngForm: NgForm;


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
