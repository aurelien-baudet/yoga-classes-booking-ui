import { StudentRef } from 'src/app/account/domain/student';
import { UserSubscriptions } from './../../../account/domain/subscription';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/account/services/subscription.service';
import { Page, PageRequest } from 'src/app/common/util/pageable.util';

@Component({
  selector: 'app-edit-subscriptions',
  templateUrl: './edit-subscriptions.page.html',
  styleUrls: ['./edit-subscriptions.page.scss'],
})
export class EditSubscriptionsPage {
  subscriptions: UserSubscriptions[];
  loading = true;
  loadingSubscriptions = new Map<string, boolean>();
  page: PageRequest;
  lastPage: Page<UserSubscriptions>;

  constructor(private subscriptionService: SubscriptionService) {}

  async ionViewDidEnter() {
    this.refreshSubscriptions();
  }

  async manualRefresh(event: any) {
    await this.refreshSubscriptions();
    event.target.complete();
  }

  async refreshSubscriptions() {
    this.page = new PageRequest();
    this.subscriptions = [];
    this.lastPage = null;
    this.loading = true;
    this.mergeSubscriptions(await this.subscriptionService.getCurrentSubscriptions(this.page));
    this.loading = false;
  }


  async refreshSingleSubscription(subscription: UserSubscriptions) {
    this.loadingSubscriptions.set(subscription.id, true);
    this.setSubscription(await this.subscriptionService.getCurrentSubscriptionsFor(subscription.subscriber));
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

  async loadNextPage(event) {
    this.page = this.page.next();
    this.lastPage = await this.subscriptionService.getCurrentSubscriptions(this.page);
    this.mergeSubscriptions(this.lastPage);
    event.target.complete();
  }

  subscriptionReference(index, item) {
    return item.id;
  }

  private mergeSubscriptions(page: Page<UserSubscriptions>) {
    this.lastPage = page;
    const start = page.number * page.size;
    for (let i = start, j = 0 ; i < start + page.numberOfElements ; i++, j++) {
      this.subscriptions[i] = page.content[j];
    }
  }

  private setSubscription(subscription: UserSubscriptions) {
    const idx = this.subscriptions.findIndex((s) => s.id === subscription.id);
    this.subscriptions[idx] = subscription;
  }
}
