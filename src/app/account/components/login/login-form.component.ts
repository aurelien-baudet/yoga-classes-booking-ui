import { Credentials } from '../../domain/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output()
  login = new EventEmitter<Credentials>();

  credentials = {
    login: '',
    password: ''
  };
}
