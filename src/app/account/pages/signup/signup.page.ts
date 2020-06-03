import { isUnregisteredUser } from './../../domain/utils';
import { ApplicationError } from './../../../booking/domain/general';
import { Component, OnInit } from '@angular/core';
import { StudentRegistration } from '../../domain/student';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { UnregisteredUser } from '../../domain/unregistered';
import { DeepPartial } from '../../../common/util/partial';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupErrors: ApplicationError[];
  unregisteredUser: DeepPartial<StudentRegistration>;

  constructor(private accountService: AccountService,
              private router: Router,
              private route: CurrentRoute) { }

  async ionViewDidEnter() {
    const currentUser = await this.accountService.getUserInfo();
    console.log('[signup-page] current user', currentUser);
    // if previously unregistered and want to create account
    // => fill fields with information that we already know
    if (isUnregisteredUser(currentUser)) {
      const unregistered = currentUser as UnregisteredUser;
      this.unregisteredUser = {
        displayName: unregistered.displayName,
        contact: unregistered.contact,
        preferences: {
          agreesToBeAssisted: unregistered.preferences.agreesToBeAssisted,
        },
      };
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
