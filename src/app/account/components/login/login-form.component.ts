import { ErrorCode, matchesErrorCode } from './../../../booking/domain/general';
import { Credentials } from '../../domain/user';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy } from '@angular/core';
import { ApplicationError } from 'src/app/booking/domain/general';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input()
  errors: ApplicationError[];

  @Output()
  login = new EventEmitter<Credentials>();
  @Output()
  change = new EventEmitter<any>();

  credentials = {
    login: '',
    password: ''
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
