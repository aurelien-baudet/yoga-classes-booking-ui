import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../domain/user';
import { UnregisteredUser } from '../../domain/unregistered';
import { Profile } from '../../domain/student';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/common/components/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @ViewChild('updated', { static: true })
  private updated: TemplateRef<any>;

  currentUser: User | UnregisteredUser;

  constructor(private accountService: AccountService,
              private router: Router,
              private notificationService: NotificationService) {
    this.accountService.currentUser$.subscribe(this.updateCurrentUser.bind(this));
  }


  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
    console.log('[profile-page] current user', this.currentUser);
  }

  async updateProfile(profile: Profile) {
    await this.accountService.updateProfile(this.currentUser, profile);
    this.notificationService.success(this.updated, {});
  }

  async resetPassword() {
    this.router.navigate(['users/password/lost']);
  }

  private updateCurrentUser(user: User | UnregisteredUser | null) {
    console.log('[profile-page] update current user', user);
    this.currentUser = user;
  }
}
