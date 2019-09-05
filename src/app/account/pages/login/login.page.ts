import { CurrentRoute } from 'src/app/common/util/router.util';
import { Credentials } from './../../domain/user';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private accountService: AccountService,
              private router: Router,
              private route: CurrentRoute) { }

  async login(credentials: Credentials) {
    // TODO: handle errors
    await this.accountService.login(credentials.login, credentials.password);
    const returnUrl = this.route.getQueryParam('returnUrl');
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
    } else {
      this.router.navigate(['']);
    }
  }

}
