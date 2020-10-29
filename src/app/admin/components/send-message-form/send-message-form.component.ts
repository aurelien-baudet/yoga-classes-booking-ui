import { ApplicationError, ErrorCode, matchesErrorCode } from 'src/app/booking/domain/general';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.scss'],
})
export class SendMessageFormComponent {
  @Input()
  errors?: ApplicationError[];

  @Output()
  sendMessage = new EventEmitter<string>();

  form = {
    message: ''
  };

  hasError(code: ErrorCode) {
    return this.errors && this.errors.some((e) => matchesErrorCode(e, code));
  }
}
