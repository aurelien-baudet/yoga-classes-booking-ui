import { Calendar } from '@ionic-native/calendar/ngx';
import { Injectable } from "@angular/core";
import { CalendarService } from '../calendar.service';
import { ScheduledClass } from 'src/app/booking/domain/reservation';
import { DateUtil } from '../../util/date.util';

@Injectable()
export class NativeCalendarService implements CalendarService {
  constructor(private calendar: Calendar,
              private dateUtil: DateUtil) { }

  async addReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    const calendars: any[] = await this.calendar.listCalendars();
    const primaries = calendars.filter((c) => c.isPrimary);
    const primary = primaries.length === 0 ? null : primaries[0];
    await this.calendar.createEventWithOptions(
      `Yoga - ${scheduledClass.lesson.title}`,
      scheduledClass.lesson.place.address,
      scheduledClass.lesson.description,
      new Date(scheduledClass.start),
      new Date(scheduledClass.end), {
        id: scheduledClass.id,
        firstReminderMinutes: 60,
        calendarId: primary ? primary.id : null
      }
    );
  }

  async updateReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    // TODO: when place has changed, should also update the calendar entry
    throw new Error("Method not implemented.");
  }

  async removeReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    await this.calendar.deleteEvent(
      `Yoga - ${scheduledClass.lesson.title}`,
      null,
      null,
      new Date(scheduledClass.start),
      new Date(scheduledClass.end)
    );
  }
}
