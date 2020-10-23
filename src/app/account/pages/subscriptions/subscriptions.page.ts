import { isUnregisteredUser } from './../../domain/utils';
import { UserSubscriptions } from './../../domain/subscription';
import { User } from 'src/app/account/domain/user';
import { AccountService } from 'src/app/account/services/account.service';
import { Component, OnInit } from '@angular/core';
import { UnregisteredUser } from '../../domain/unregistered';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage {
  private currentUser: User | UnregisteredUser;
  subscription: UserSubscriptions;

  constructor(private accountService: AccountService,
              private subscriptionService: SubscriptionService) {
    this.accountService.currentUser$.subscribe(this.updateCurrentUser.bind(this));
  }

  async ionViewDidEnter() {
    this.currentUser = await this.accountService.getUserInfo();
    console.log('[book-lessons-page] current user', this.currentUser);
    this.refreshSubscription();
  }

  private updateCurrentUser(user: User | UnregisteredUser | null) {
    console.log('[subscriptions-pages] update current user', user);
    this.currentUser = user;
    this.refreshSubscription();
  }

  async refreshSubscription() {
    if (!this.currentUser || isUnregisteredUser(this.currentUser)) {
      this.subscription = null;
      return;
    }
    this.subscription = await this.subscriptionService.getCurrentSubscriptionsFor(this.currentUser as User);
  }
}
