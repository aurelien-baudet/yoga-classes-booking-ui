import { AccountService } from 'src/app/account/services/account.service';
import { DateUtil } from '../../util/date.util';
import { Place } from '../../../booking/domain/reservation';
import { ClassService } from 'src/app/booking/services/class.service';
import { Injectable, EventEmitter } from '@angular/core';
import { PlaceService } from 'src/app/admin/services/place.service';
import { NotificationData } from '@ionic-native/fcm/ngx';
import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ScheduledClass } from 'src/app/booking/domain/reservation';
import { PushNotificationHandlerService } from '../push-notification-handler.service';
import { ApplicationEventService } from '../application-event.service';
import { BookingService } from 'src/app/booking/services/booking.service';
import { User } from 'firebase';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { StudentId } from 'src/app/account/domain/student';

@Injectable()
export class NativeLocalPushNotificationHandlerService implements PushNotificationHandlerService {
  constructor(private classService: ClassService,
              private placeService: PlaceService,
              private userService: AccountService,
              private bookingService: BookingService,
              private localNotifications: LocalNotifications,
              private dateUtil: DateUtil,
              private applicationEventService: ApplicationEventService) {
    localNotifications.on('confirm-presence').subscribe((data) => this.confirmPresence(data));
    localNotifications.on('unbook').subscribe((data) => this.unbook(data));
    localNotifications.on('remove-from-calendar').subscribe((data) => this.removeFromCalendar(data));
    localNotifications.on('click').subscribe(() => applicationEventService.refreshBookings.emit());
  }


  async displayNotification(data: NotificationData) {
    console.log('display notification', data);
    const notification = await this.build(data);
    if (notification) {
      this.localNotifications.schedule(notification);
    }
  }

  private async build(data: NotificationData): Promise<ILocalNotification | null> {
    switch (data.type) {
      case 'PLACE_CHANGED':
        return this.placeChanged(await this.classService.getClassInfo({id: data.classId}),
                                 await this.placeService.getPlaceInfo({id: data.newPlaceId}));
      case 'CANCELED':
        return this.classCanceled(await this.classService.getClassInfo({id: data.canceledClassId}), data.cancelMessage);
      case 'FREE_PLACE_AUTOMATICALLY_BOOKED':
        return this.freePlaceBookedForYou(await this.classService.getClassInfo({id: data.bookedClassId}),
                                          await this.userService.getUserInfo());
      case 'REMINDER':
        return this.reminder(await this.classService.getClassInfo({id: data.classId}),
                             await this.userService.getUserInfo());
      default:
        return null;
    }
  }

  private placeChanged(scheduledClass: ScheduledClass, place: Place): ILocalNotification {
    return {
      title: 'Changement de lieu',
      text: `Le cours du ${this.dateUtil.formatRange(scheduledClass)}\naura lieu à ${place.name}.\n\n${place.address}`,
      attachments: [place.plan],
      launch: true,
      lockscreen: true,
      foreground: true
    };
  }

  private classCanceled(canceledClass: ScheduledClass, message: string): ILocalNotification {
    return {
      title: 'Cours annulé',
      text: `Le cours du ${this.dateUtil.formatRange(canceledClass)}\na été annulé.\n\n${message}`,
      actions: [{
        id: 'remove-from-calendar',
        title: 'Retirer du calendrier'
      }],
      launch: true,
      lockscreen: true,
      foreground: true
    };
  }

  private removeFromCalendar(notification) {
    console.log('removeFromCalendar', notification);
    alert('Bientôt disponible');
  }

  private freePlaceBookedForYou(bookedClass: ScheduledClass, currentUser: User | UnregisteredUser): ILocalNotification {
    return {
      title: 'Place libre',
      text: `Une place vient de se libérer pour le cours du\n${this.dateUtil.formatRange(bookedClass)}.\n\nEtant premier sur la liste d'attente,\ntu a été automatiquement inscrit.`,
      actions: [{
        id: 'confirm-presence',
        title: 'Confirmer présence'
      }, {
        id: 'unbook',
        title: 'Pas disponible'
      }],
      data: {
        bookedClass,
        currentUser
      },
      launch: true,
      lockscreen: true,
      foreground: true
    };
  }

  private async confirmPresence(notification) {
    // nothing to do, booking is done automatically
    this.applicationEventService.refreshBookings.emit();
  }

  private async unbook(notification) {
    const currentUser = await this.userService.getUserInfo();
    await this.bookingService.unbook(currentUser, notification.data.bookedClass);
    this.applicationEventService.refreshBookings.emit();
  }

  private reminder(nextClass: ScheduledClass, currentUser: User | UnregisteredUser) {
    return {
      title: 'Rappel',
      text: `Tu es inscris au cours du\n${this.dateUtil.formatRange(nextClass)}.\n\nPense à arriver 10 minutes avant pour que\nle cours commence à l'heure.`,
      actions: [{
        id: 'unbook',
        title: 'Me désinscrire'
      }],
      data: {
        bookedClass: nextClass,
        currentUser
      },
      launch: true,
      lockscreen: true,
      foreground: true
    };
    // TODO: add possibility to indicate that user will be late (input with how much time + message to teacher)
  }
}
