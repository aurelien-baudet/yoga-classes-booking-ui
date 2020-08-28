import { ScheduledClass, Booking } from './../domain/reservation';
import { StudentRef } from '../../account/domain/student';


export abstract class StudentListUnbookableStateProvider {
  abstract isUnbookable(booking: Booking): boolean;
}
