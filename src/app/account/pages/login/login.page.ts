import { CurrentRoute } from 'src/app/common/util/router.util';
import { Credentials } from './../../domain/user';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { SocialAuthenticator, ApplicationError } from 'src/app/booking/domain/general';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginErrors: ApplicationError[];

  constructor(private accountService: AccountService,
              private router: Router,
              private route: CurrentRoute) { }

  async login(credentials: Credentials) {
    try {
      await this.accountService.login(credentials.login, credentials.password);
      const returnUrl = this.route.getQueryParam('returnUrl');
      // after login, redirect to the right page
      // if lessons page (default page), then force redirect to '/' in order to go to the right homepage
      if (returnUrl && !this.route.matches('lessons')) {
        this.router.navigateByUrl(returnUrl);
      } else {
        this.router.navigate(['']);
      }
    } catch (e) {
      this.loginErrors = [e];
    }
  }

  async authenticate(authenticator: SocialAuthenticator) {
    alert(`Authentification via ${authenticator} bientôt disponible`);
  }


  resetPassword() {
    this.router.navigate(['users', 'password', 'lost']);
  }
}
