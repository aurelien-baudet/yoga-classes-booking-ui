import { Calendar } from '@ionic-native/calendar/ngx';
import { Injectable } from "@angular/core";
import { CalendarService } from '../calendar.service';
import { ScheduledClass } from 'src/app/booking/domain/reservation';

@Injectable()
export class MockCalendarService implements CalendarService {
  addReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  updateReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    throw new Error("Method not implemented.");
  }

  removeReminderForClass(scheduledClass: ScheduledClass): Promise<void> {
    throw new Error("Method not implemented.");
  }
}