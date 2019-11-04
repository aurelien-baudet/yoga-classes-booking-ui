import { ScheduledClass } from 'src/app/booking/domain/reservation';

export abstract class CalendarService {
  abstract async addReminderForClass(scheduledClass: ScheduledClass): Promise<void>;
  abstract async updateReminderForClass(scheduledClass: ScheduledClass): Promise<void>;
  abstract async removeReminderForClass(scheduledClass: ScheduledClass): Promise<void>;
}
