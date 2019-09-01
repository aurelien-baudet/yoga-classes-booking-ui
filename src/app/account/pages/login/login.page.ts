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
              private router: Router) { }

  async login(credentials: Credentials) {
    // TODO: handle errors
    await this.accountService.login(credentials.login, credentials.password);
    this.router.navigate(['']);
  }

}
