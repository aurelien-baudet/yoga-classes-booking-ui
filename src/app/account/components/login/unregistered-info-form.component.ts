import { ApplicationError, ErrorCode, matchesErrorCode } from 'src/app/booking/domain/general';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';

const defaultModel = () => ({
  displayName: '',
  email: '',
  phoneNumber: '',
  sendBookedMail: true
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
  set unregisteredUser(unregisteredUser: UnregisteredUser) {
    this.unregisteredUserModel = unregisteredUser || defaultModel();
  }

  @Output()
  continue = new EventEmitter<UnregisteredUser>();

  unregisteredUserModel: UnregisteredUser = defaultModel();

  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }
}
