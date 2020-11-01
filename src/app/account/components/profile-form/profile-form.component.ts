import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ApplicationError, ErrorCode, matchesErrorCode } from 'src/app/booking/domain/general';
import { Profile } from 'src/app/account/domain/student';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Input()
  errors: ApplicationError[];

  @Input()
  profile: Profile;

  @Output()
  update = new EventEmitter<Profile>();

  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }
}
