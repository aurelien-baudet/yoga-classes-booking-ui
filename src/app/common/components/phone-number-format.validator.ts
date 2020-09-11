import { ValidatorFn, AbstractControl, Validator, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();


const invalid = (key: string, control: AbstractControl) => ({
  [key]: { value: control.value }
});

export function PhoneNumberValidator(format: PhoneNumberFormat): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    try {
      // TODO: use format
      if (!control.value.startsWith('+')) {
        return invalid('missingInternationalPrefix', control);
      }
      const phoneNumber = phoneNumberUtil.parse(control.value);
      return phoneNumberUtil.isValidNumber(phoneNumber) ? null : invalid('invalidNumber', control);
    } catch (e) {
      return invalid('invalidNumber', control);
    }
  };
}

@Directive({
  selector: '[appPhoneNumberFormat]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PhoneNumberFormatValidator, multi: true }
  ]
})
export class PhoneNumberFormatValidator implements Validator {
  @Input('appPhoneNumberFormat')
  format: string;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    return this.format ? PhoneNumberValidator(this.toPhoneNumberFormat(this.format))(control) : null;
  }

  private toPhoneNumberFormat(format: string): PhoneNumberFormat {
    return PhoneNumberFormat[format.toUpperCase()];
  }

}
