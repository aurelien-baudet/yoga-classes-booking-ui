import { AccountService } from 'src/app/account/services/account.service';
import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[appLoginAvailable]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: LoginAvailableValidator, multi: true }
  ]
})
export class LoginAvailableValidator implements AsyncValidator {
  constructor(private accountService: AccountService) { }

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    if (!control.value) {
      return null;
    }
    if (!await this.accountService.isLoginAvailable(control.value)) {
      return { loginAvailable: { valid: false }};
    }
    return null;
  }
}
