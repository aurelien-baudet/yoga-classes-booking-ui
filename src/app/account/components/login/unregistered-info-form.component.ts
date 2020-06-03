import { ApplicationError, ErrorCode, matchesErrorCode } from 'src/app/booking/domain/general';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UnregisteredUser, UnregisteredUserRegistration } from 'src/app/account/domain/unregistered';

const defaultModel = () => ({
  displayName: '',
  contact: {
    email: '',
    phoneNumber: '',
  },
  preferences: {
    agreesToBeAssisted: true,
    sendBookedMail: true
  }
});

@Component({
  selector: 'app-unregistered-info-form',
  templateUrl: './unregistered-info-form.component.html',
  styleUrls: ['./unregistered-info-form.component.scss'],
})
export class UnregisteredInfoFormComponent {
  @Input()
  errors: ApplicationError[];
  @Input()
  submitText = 'Terminer ma réservation';
  @Input()
  set unregisteredUser(unregisteredUser: UnregisteredUserRegistration) {
    this.unregisteredUserModel = unregisteredUser || defaultModel();
  }

  @Output()
  continue = new EventEmitter<UnregisteredUserRegistration>();

  unregisteredUserModel: UnregisteredUserRegistration = defaultModel();

  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }
}
