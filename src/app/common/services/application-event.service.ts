import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ApplicationEventService {
  readonly refreshBookings = new EventEmitter<any>();
}
