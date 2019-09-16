import { EventEmitter } from '@angular/core';
import { NotificationData } from '@ionic-native/fcm/ngx';

export abstract class PushNotificationHandlerService {
  abstract async displayNotification(data: NotificationData);
}
