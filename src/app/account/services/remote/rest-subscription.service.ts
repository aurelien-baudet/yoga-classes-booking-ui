import { StudentRef } from 'src/app/account/domain/student';
import { Page, PageRequest } from './../../../common/util/pageable.util';
import { first } from 'rxjs/operators';
import { UserSubscriptions } from 'src/app/account/domain/subscription';
import { User } from 'src/app/account/domain/user';
import { Injectable } from '@angular/core';
import { ServerConfig } from 'src/environments/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApplicationError, matchesErrorCode } from '../../../booking/domain/general';
import { SubscriptionService, SubscriptionsUpdate } from '../subscription.service';


@Injectable({
  providedIn: 'root'
})
export class RestSubscriptionService implements SubscriptionService {

  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) {}

  async getCurrentSubscriptionsFor(student: User | StudentRef): Promise<UserSubscriptions> {
    return UserSubscriptions.from(await this.http.get<UserSubscriptions>(`${this.serverConfig.url}/subscriptions/${student.id}`)
      .pipe(first())
      .toPromise());
    // TODO: handle errors
  }

  async getCurrentSubscriptions(name: string, page: PageRequest): Promise<Page<UserSubscriptions>> {
    return Page.from(UserSubscriptions.from, await this.http.get<Page<UserSubscriptions>>(`${this.serverConfig.url}/subscriptions`, this.filterAndSortByName(name, page))
      .pipe(first())
      .toPromise());
  }

  async updateSubscriptionsForStudent(student: User | StudentRef, subscription: SubscriptionsUpdate): Promise<UserSubscriptions> {
    return UserSubscriptions.from(await this.http.post<UserSubscriptions>(`${this.serverConfig.url}/subscriptions/${student.id}`, subscription)
      .pipe(first())
      .toPromise());
  }

  private filterAndSortByName(name: string, page: PageRequest): {params: HttpParams} {
    let params = new HttpParams();
    const merged = {...this.filterByName(name), ...this.sortByName(page)};
    for (const key in merged) {
     params = params.set(key, `${merged[key]}`);
    }
    return {params};
  }

  private filterByName(name: string): {[key: string]: string} {
    return {displayName: name};
  }

  private sortByName(page: PageRequest): {[key: string]: any} {
    // TODO: ignore case
    // params = params.set('sort', 'displayName,asc,ignoreCase');
    return {sort: 'displayName,asc', ...page};
  }
}
