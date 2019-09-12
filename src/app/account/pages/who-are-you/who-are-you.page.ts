import { SocialAuthenticator } from './../../../booking/domain/general';
import { Router } from '@angular/router';
import { Credentials, User, isUnregisteredUser } from './../../domain/user';
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
  private segment = 'login';
  currentUser: User | UnregisteredUser | null;

  constructor(private accountService: AccountService,
              private router: Router) { }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
  }

  async login(credentials: Credentials) {
    // TODO: handle errors
    await this.accountService.login(credentials.login, credentials.password);
    this.router.navigate([''], {
      queryParamsHandling: 'preserve'
    });
  }

  async finishBooking(student: UnregisteredUser) {
    await this.accountService.saveUnregisterdUserInfo(student);
    this.router.navigate([''], {
      queryParamsHandling: 'preserve'
    });
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

  showUnregistered() {
    return this.segment === 'unregistered';
  }

  getUnregisteredUserInfo() {
    if (isUnregisteredUser(this.currentUser)) {
      return this.currentUser;
    }
    return null;
  }

  async authenticate(authenticator: SocialAuthenticator) {
    alert(`Authentification via ${authenticator} bientôt disponible`);
  }
}
