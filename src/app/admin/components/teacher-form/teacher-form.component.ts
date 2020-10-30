import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TeacherRegistration } from './../../../account/domain/teacher';
import { ErrorCode, matchesErrorCode } from './../../../booking/domain/general';
import { ApplicationError } from 'src/app/booking/domain/general';
import { DeepPartial } from './../../../common/util/partial';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';


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
export class TeacherFormComponent implements OnInit, OnDestroy {
  @Input()
  errors: ApplicationError[];
  @Input()
  set teacher(newTeacher: DeepPartial<TeacherRegistration>) {
    this.ngForm.resetForm();
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


  @Output()
  change = new EventEmitter<any>();

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
