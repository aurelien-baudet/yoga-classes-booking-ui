import { StudentListUnbookableStateProvider } from "../../../booking/services/student-list-unbookable-state.provider";
import { Booking } from "../../../booking/domain/reservation";

export class CanUnbookAnyBookingUnbookableProvider implements StudentListUnbookableStateProvider {
  isUnbookable(booking: Booking): boolean {
    return true;
  }
}
