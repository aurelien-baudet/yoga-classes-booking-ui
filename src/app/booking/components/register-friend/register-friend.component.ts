import { UserInfo } from 'src/app/account/domain/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-friend',
  templateUrl: './register-friend.component.html',
  styleUrls: ['./register-friend.component.scss'],
})
export class RegisterFriendComponent {

  @Output()
  friendAdded = new EventEmitter<UserInfo>();

}
