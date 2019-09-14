import { first } from 'rxjs/operators';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { User, isRegisteredUser } from 'src/app/account/domain/user';
import { FCM } from '@ionic-native/fcm/ngx';
import { Injectable } from "@angular/core";
import { PushNotificationService } from '../push-notification.service';
import { ServerConfig } from 'src/environments/config';

@Injectable()
export class FcmPushNotificationService implements PushNotificationService {
  private currentUser: User | UnregisteredUser | null;

  constructor(private fcm: FCM,
              private http: HttpClient,
              private serverConfig: ServerConfig) {
    this.fcm.onTokenRefresh()
      .subscribe(
        async (token) => await this.updateToken(token, this.currentUser),
        (error) => this.tokenRefreshFailure(error)
      );
  }

  async registerCurrentDeviceForUser(user: User | UnregisteredUser | null): Promise<void> {
    this.currentUser = user;
    await this.updateToken(await this.fcm.getToken(), user);
  }

  async unregisterCurrentDeviceForUser(user: User | UnregisteredUser | null): Promise<void> {
    // TODO: unregister device
  }

  private async updateToken(token: string, user: User | UnregisteredUser | null) {
    // TODO: if different user => unregister ?
    if (user && isRegisteredUser(user)) {
      try {
      await this.http.post(`${this.serverConfig.url}/devices`, {fcmToken: token})
        .pipe(first())
        .toPromise();
      } catch (e) {
        console.error('Failed to register device', e);
        throw e;
      }
    }
  }

  private tokenRefreshFailure(error) {
    console.error('Failed to refresh FCM push notification token', error);
  }
}
