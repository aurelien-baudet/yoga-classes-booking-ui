import { ApplicationError } from './../../../booking/domain/general';
import { Component, OnInit } from '@angular/core';
import { StudentRegistration } from '../../domain/student';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CurrentRoute } from 'src/app/common/util/router.util';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupErrors: ApplicationError[];

  constructor(private accountService: AccountService,
              private router: Router,
              private route: CurrentRoute) { }

  ngOnInit() {
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
