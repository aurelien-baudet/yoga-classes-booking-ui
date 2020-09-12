import { StudentRegistration } from 'src/app/account/domain/student';
import { UnregisteredUserRegistration } from './../../domain/unregistered';
import { isUnregisteredUser } from './../../domain/utils';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { ApplicationError } from 'src/app/booking/domain/general';
import { SocialAuthenticator } from './../../../booking/domain/general';
import { Router } from '@angular/router';
import { Credentials, User } from './../../domain/user';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UnregisteredUser } from '../../domain/unregistered';
import { BookingService } from 'src/app/booking/services/booking.service';

@Component({
  selector: 'app-who-are-you-page',
  templateUrl: './who-are-you.page.html',
  styleUrls: ['./who-are-you.page.scss'],
})
export class WhoAreYouPage {
  private segment = 'signup';
  currentUser: User | UnregisteredUser | null;
  loginErrors: ApplicationError[];
  signupErrors: ApplicationError[];

  constructor(private accountService: AccountService,
              private router: Router,
              private route: CurrentRoute) { }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
  }

  async login(credentials: Credentials) {
    try {
      await this.accountService.login(credentials.login, credentials.password);
      this.redirect(['']);
    } catch (e) {
      this.loginErrors = [e];
    }
  }

  async registerStudent(student: StudentRegistration) {
    try {
      await this.accountService.registerStudent(student);
      this.redirect(['']);
    } catch (e) {
      this.signupErrors = [e];
    }
  }


  register() {
    this.router.navigate(['users', 'signup'], {
      queryParamsHandling: 'merge'
    });
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  showLogin() {
    return this.segment === 'login';
  }

  showSignup() {
    return this.segment === 'signup';
  }

  async authenticate(authenticator: SocialAuthenticator) {
    alert(`Authentification via ${authenticator} bientôt disponible`);
  }

  resetPassword() {
    this.router.navigate(['users', 'password', 'lost'], {
      queryParamsHandling: 'merge'
    });
  }

  private redirect(defaultPage: any[]) {
    const returnUrl = this.route.getQueryParam('returnUrl');
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
    } else {
      this.router.navigate(defaultPage, {
        queryParamsHandling: 'preserve'
      });
    }
  }
}
