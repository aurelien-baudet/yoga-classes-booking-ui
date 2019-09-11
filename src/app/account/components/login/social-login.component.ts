import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SocialAuthenticator } from 'src/app/booking/domain/general';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent {
  SocialAuthenticator = SocialAuthenticator;
  
  @Output()
  authenticate = new EventEmitter<SocialAuthenticator>();
}
