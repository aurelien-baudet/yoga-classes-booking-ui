import { DateRange } from './../../booking/domain/general';
import { formatDate } from '@angular/common';
import { Injectable, Inject, LOCALE_ID } from '@angular/core';

@Injectable()
export class DateUtil {
  
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  formatRange(range: DateRange) {
    return `${this.formatStart(range.start)} - ${this.formatEnd(range.end)}`;
  }

  formatTimeRange(range: DateRange) {
    return `${this.formatHour(range.start)} - ${this.formatEnd(range.end)}`;
  }

  formatHour(date: number | Date) {
      return formatDate(date, this.formatHourPattern(date), this.locale);
  }

  formatHourPattern(date: number | Date) {
    if (new Date(date).getMinutes() === 0) {
      return "H'h'";
    }
    return "H'h'mm";
  }

  formatHourString(text: string, partial = false) {
    return text.replace(/(\d{1,2})([h:])?(\d{0,2})/, (_, hours, separator, minutes) => {
      if (separator) {
        return hours + 'h' + minutes;
      }
      if (partial && hours.length <= 1) {
        return hours;
      }
      if (partial) {
        return hours + minutes;
      }
      return hours + 'h' + minutes;
    });
  }

  startOfDay(date: number | Date) {
    const d = new Date(date);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }

  toISODateString(date: number | Date): any {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  private formatStart(start: number | Date) {
    return formatDate(start, 'EEEE d MMMM ' + this.formatHourPattern(start), this.locale);
  }

  private formatEnd(end: number | Date) {
    return formatDate(end, this.formatHourPattern(end), this.locale);
  }
}
