import { UserInfo } from 'src/app/account/domain/user';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';

@Component({
  selector: 'app-register-friend',
  templateUrl: './register-friend.component.html',
  styleUrls: ['./register-friend.component.scss'],
})
export class RegisterFriendComponent {
  @Input()
  searchFriendProvider: AutoCompleteService;

  @Output()
  addFriend = new EventEmitter<UserInfo>();
}
