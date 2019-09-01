import { Instant } from './../../booking/domain/general';
import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: any, args?: any): any {
    if(!value) {
      return null;
    }
    return `${this.formatStart(value.start)} - ${this.formatEnd(value.end)}`;
  }

  private formatStart(start) {
    return formatDate(start, "EEEE d MMMM " + this.formatHour(start), this.locale);
  }

  private formatEnd(end) {
    return formatDate(end, this.formatHour(end), this.locale);
  }

  private formatHour(date: Instant) {
    if (new Date(date).getMinutes() === 0) {
      return "H'h'";
    }
    return "H'h'mm";
  }
}
