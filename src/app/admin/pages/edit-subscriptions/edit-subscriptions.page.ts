import { StudentRef } from 'src/app/account/domain/student';
import { UserSubscriptions } from './../../../account/domain/subscription';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/account/services/subscription.service';
import { Page } from 'src/app/common/util/pageable.util';

@Component({
  selector: 'app-edit-subscriptions',
  templateUrl: './edit-subscriptions.page.html',
  styleUrls: ['./edit-subscriptions.page.scss'],
})
export class EditSubscriptionsPage {
  subscriptions: Page<UserSubscriptions>;
  loading = true;
  loadingSubscriptions = new Map<string, boolean>();

  constructor(private subscriptionService: SubscriptionService) {}

  async ionViewDidEnter() {
    this.refreshSubscriptions();
  }

  async manualRefresh(event: any) {
    await this.refreshSubscriptions();
    event.target.complete();
  }

  async refreshSubscriptions() {
    this.loading = true;
    this.subscriptions = await this.subscriptionService.getCurrentSubscriptions();
    this.loading = false;
  }


  async refreshSingleSubscription(subscription: UserSubscriptions) {
    this.loadingSubscriptions.set(subscription.id, true);
    this.subscriptions = await this.subscriptionService.getCurrentSubscriptions();
    this.loadingSubscriptions.delete(subscription.id);
  }

  isLoading(subscription: UserSubscriptions) {
    return this.loadingSubscriptions.has(subscription.id);
  }

  async updateSubscriptions(subscription: UserSubscriptions) {
    // TODO: handle errors
    await this.subscriptionService.updateSubscriptionsForStudent(subscription.subscriber, subscription);
    await this.refreshSingleSubscription(subscription);
  }


  subscriptionReference(index, item) {
    return item.id;
  }
}
