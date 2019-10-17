import { DateRange, Instant } from './../../booking/domain/general';
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

  formatDate(date: number | Date) {
    return formatDate(date, 'dd/MM/yyyy', this.locale);
  }

  formatDateString(text: string, partial = false) {
    return text.replace(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/g, (_, day, month, year) => {
      const date = new Date(year, month - 1, day);
      return this.formatDate(date);
    });
  }

  parseDate(text: string) {
    const [_, day, month, year] = text.match(/(\d{1,2})[/](\d{1,2})[/](\d{4})/);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
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

  frequencyIterable(repeat: string, from: DateRange, until: Instant) {
    return {
      [Symbol.iterator]() {
        switch (repeat) {
          case 'day':
            return new DateRangeFixedStepIterator(from, until, 24*60*60*1000);
          case 'week':
            return new DateRangeFixedStepIterator(from, until, 7*24*60*60*1000);
          case 'month':
            return new DateRangeMonthIterator(from, until);
        }
        return new NoneIterator(from);
      }
    }
  }

  private formatStart(start: number | Date) {
    return formatDate(start, 'EEEE d MMMM ' + this.formatHourPattern(start), this.locale);
  }

  private formatEnd(end: number | Date) {
    return formatDate(end, this.formatHourPattern(end), this.locale);
  }
}

export class DateRangeFixedStepIterator implements Iterator<DateRange> {
  private current: DateRange;

  constructor(from: DateRange,
              private until: Instant,
              private step: number) {
    this.current = from;
  }

  next(value?: any): IteratorResult<DateRange> {
    const next = {
      done: this.current.start > this.until,
      value: this.current
    };
    this.current = {
      start: this.current.start + this.step,
      end: this.current.end + this.step
    };
    return next;
  }
}

export class DateRangeMonthIterator implements Iterator<DateRange> {
  private current: DateRange;

  constructor(from: DateRange,
              private until: number) {
    this.current = from;
  }

  next(value?: any): IteratorResult<DateRange> {
    const next = {
      done: this.current.start > this.until,
      value: this.current
    };
    const start = new Date(this.current.start);
    start.setMonth(start.getMonth() + 1);
    const end = new Date(this.current.end);
    end.setMonth(start.getMonth() + 1);
    this.current = {
      start: start.valueOf(),
      end: end.valueOf()
    };
    return next;
  }
}

export class NoneIterator implements Iterator<DateRange> {
  private done = false;

  constructor(private from: DateRange) { }

  next(value?: any): IteratorResult<DateRange> {
    const next = {
      done: this.done,
      value: this.from
    };
    this.done = true;
    return next;
  }
}
