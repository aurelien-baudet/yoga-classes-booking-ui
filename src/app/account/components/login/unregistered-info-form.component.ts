import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UnregisteredUser } from '../../domain/unregistered';

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
  set unregisteredUser(unregisteredUser: UnregisteredUser) {
    this.unregisteredUserModel = unregisteredUser || defaultModel();
  }

  @Output()
  continue = new EventEmitter<UnregisteredUser>();

  unregisteredUserModel: UnregisteredUser = defaultModel();
}
