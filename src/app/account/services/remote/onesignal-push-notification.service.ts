import { isRegisteredUser } from './../../domain/utils';
import { BookingService } from 'src/app/booking/services/booking.service';
import { CalendarService } from 'src/app/common/services/calendar.service';
import { ApplicationEventService } from './../../../common/services/application-event.service';
import { AccountService } from 'src/app/account/services/account.service';
import { Platform } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/account/domain/user';
import { Injectable, NgZone } from '@angular/core';
import { PushNotificationService } from '../push-notification.service';
import { ServerConfig, OneSignalConfig } from 'src/environments/config';
import { ClassService } from 'src/app/booking/services/class.service';
import { PlaceService } from 'src/app/admin/services/place.service';
import { OneSignal, OSDisplayType, OSActionType, OSNotification, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';


@Injectable()
export class OnesignalPushNotificationService implements PushNotificationService {
  private currentUser: User | UnregisteredUser | null;

  constructor(private onesignal: OneSignal,
              private http: HttpClient,
              private serverConfig: ServerConfig,
              private classService: ClassService,
              private placeService: PlaceService,
              private userService: AccountService,
              private bookingService: BookingService,
              private applicationEventService: ApplicationEventService,
              private calendar: CalendarService,
              private router: Router,
              zone: NgZone,
              onesignalConfig: OneSignalConfig,
              platform: Platform) {
    platform.ready().then(() => {
      console.log('[OneSignal] init start');
      onesignal.startInit(onesignalConfig.appId, onesignalConfig.googleProjectNumber);
      onesignal.inFocusDisplaying(OSDisplayType.Notification);
      onesignal.handleNotificationOpened().subscribe((notification) => zone.run(() => this.handleNotificationActions(notification)));
      onesignal.handleNotificationReceived().subscribe((notification) => console.log('[OneSignal] notification received', notification));
      onesignal.endInit();
      console.log('[OneSignal] init end');
    });
  }

  private async handleNotificationActions(notification: OSNotificationOpenedResult) {
    console.log('[OneSignal] notification opened', notification);
    const data = notification.notification.payload.additionalData;
    if (notification.action.type === OSActionType.ActionTake) {
      await this.handleButtonAction(notification.action.actionID, notification.notification, data);
    } else {
      // refresh bookings
      this.applicationEventService.refreshBookings.emit();
      // show particular class information
      this.router.navigate(['classes', data.classId]);
    }
  }

  private async handleButtonAction(actionId: string, notification: OSNotification, data: any) {
    switch (actionId) {
      case 'confirm-presence':
        await this.confirmPresence(notification, data);
        break;
      case 'show-directions':
        await this.showDirections(notification, data);
        break;
      case 'remove-from-calendar':
        await this.removeFromCalendar(notification, data);
        break;
      case 'unbook':
        await this.unbook(notification, data);
        break;
    }
  }

  async registerCurrentDeviceForUser(user: User | UnregisteredUser | null): Promise<void> {
    this.currentUser = user;
    try {
      await this.updateToken((await this.onesignal.getIds()).userId, user);
    } catch (e) {
      console.error('Failed to register current device', e);
      // skip if cordova not available (web version)
      if (e !== 'cordova_not_available') {
        throw e;
      }
    }
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

  private async showDirections(notification: OSNotification, data: any) {
    console.log('[OneSignal] showDirections', notification, data);
    const place = await this.placeService.getPlaceInfo({id: data.newPlaceId});
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`, '_system');
  }

  private async removeFromCalendar(notification: OSNotification, data: any) {
    console.log('[OneSignal] removeFromCalendar', notification, data);
    const scheduledClass = await this.classService.getClassInfo({id: data.classId});
    this.calendar.removeReminderForClass(scheduledClass);
  }

  private async confirmPresence(notification: OSNotification, data: any) {
    console.log('[OneSignal] confirmPresence', notification, data);
    // nothing to do, booking is done automatically
    this.applicationEventService.refreshBookings.emit();
  }

  private async unbook(notification: OSNotification, data: any) {
    console.log('[OneSignal] unbook', notification, data);
    const currentUser = await this.userService.getUserInfo();
    await this.bookingService.unbook(currentUser, {id: data.classId});
    this.applicationEventService.refreshBookings.emit();
  }
}
