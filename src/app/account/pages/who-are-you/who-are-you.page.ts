import { Router } from '@angular/router';
import { Credentials } from './../../domain/user';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UnregisteredUser } from '../../domain/unregistered';
import { BookingService } from 'src/app/booking/services/booking.service';

@Component({
  selector: 'app-who-are-you-page',
  templateUrl: './who-are-you.page.html',
  styleUrls: ['./who-are-you.page.scss'],
})
export class WhoAreYouPage implements OnInit {
  private segment = 'login';

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
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
}
