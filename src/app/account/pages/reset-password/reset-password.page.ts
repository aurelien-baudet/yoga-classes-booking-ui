import { AccountService } from 'src/app/account/services/account.service';
import { matchesErrorCode } from 'src/app/booking/domain/general';
import { CurrentRoute } from './../../../common/util/router.util';
import { Router } from '@angular/router';
import { ErrorCode, ApplicationError } from './../../../booking/domain/general';
import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../services/password.service';

interface PasswordResetFormValue {
  contact: string
}
interface ValidateFormValue {
  code: string;
}
interface ChangePasswordFormValue {
  newPassword: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

  errors: ApplicationError[];

  request: PasswordResetFormValue = {contact: ''};
  validate: ValidateFormValue = {code: ''};
  change: ChangePasswordFormValue = {newPassword: ''};

  private step: string;
  private code: string;

  constructor(private router: Router,
              private route: CurrentRoute,
              private accountService: AccountService,
              private passwordService: PasswordService) { }


  async ionViewDidEnter() {
    this.step = this.route.getData('step');
    this.code = this.route.getQueryParam('code');
  }

  async ionViewWillLeave() {
    this.reset();
  }

  showRequestCodeStep() {
    return !this.code && this.step === 'request';
  }

  showEnterCodeStep() {
    return !this.code && this.step === 'validate';
  }

  showChangePasswordStep() {
    return this.code && this.step === 'change';
  }

  async requestResetCode(request: PasswordResetFormValue) {
    await this.passwordService.requestPasswordReset(request.contact);
    this.router.navigate(['users', 'password', 'validate-code']);
  }

  async checkCode(validate: ValidateFormValue) {
    try {
      await this.passwordService.validateResetCode(validate.code);
      this.router.navigate(['users', 'password', 'reset'], {queryParams: validate});
    } catch (e) {
      this.errors = [e];
    }
  }

  async changePassword(change: ChangePasswordFormValue) {
    try {
      await this.passwordService.changePassword(this.code, change.newPassword);
      this.router.navigate(['users', 'login']);
    } catch (e) {
      this.errors = [e];
    }
  }

  requestNewCode() {
    if (!this.request.contact) {
      this.router.navigate(['users', 'password', 'lost']);
    } else {
      this.requestResetCode(this.request);
    }
  }


  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }

  reset() {
    this.request.contact = '';
    this.validate.code = '';
    this.change.newPassword = '';
  }

}
