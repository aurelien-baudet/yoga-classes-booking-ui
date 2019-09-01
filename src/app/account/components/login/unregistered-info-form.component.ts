import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UnregisteredUser } from '../../domain/unregistered';

@Component({
  selector: 'app-unregistered-info-form',
  templateUrl: './unregistered-info-form.component.html',
  styleUrls: ['./unregistered-info-form.component.scss'],
})
export class UnregisteredInfoFormComponent {
  @Output()
  continue = new EventEmitter<UnregisteredUser>();

  // TODO: retrieve previous value from session storage
  unregisteredUser: UnregisteredUser = {
    displayName: '',
    email: '',
    phoneNumber: '',
    sendBookedMail: true
  }
}
