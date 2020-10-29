import { ScheduledClass } from './../../booking/domain/reservation';
import { SendReport } from '../domain/messages';

export abstract class MessageService {
  async abstract sendMessageToApprovedStudents(scheduledClass: ScheduledClass, message: string): Promise<SendReport[]>;
}
