import { Instant } from './../../../booking/domain/general';
import { DateUtil } from '../../util/date.util';
import { Injectable } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { ScheduledClass } from 'src/app/booking/domain/reservation';

@Injectable()
export class GoogleCalendarService implements CalendarService {
  constructor(private dateUtil: DateUtil) { }

  async addReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    window.open(`http://www.google.com/calendar/event?action=TEMPLATE&dates=${this.formatDateParam(scheduledClass.start)}%2F${this.formatDateParam(scheduledClass.end)}&text=${`Yoga - ${scheduledClass.lesson.title}`}&location=${encodeURIComponent(scheduledClass.lesson.place.address)}&details=${encodeURIComponent(scheduledClass.lesson.description)}`);
  }

  async updateReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    // TODO: when place has changed, should also update the calendar entry
    throw new Error("Method not implemented.");
  }

  async removeReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    alert('Bientôt disponible');
  }

  private formatDateParam(date: Instant) {
    return new Date(date).toISOString().replace('000Z', 'Z').replace(/[\-.:]/g, '');
  }
}
