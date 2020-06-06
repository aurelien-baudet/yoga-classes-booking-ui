import { Instant } from './../../booking/domain/general';
import { Pipe, PipeTransform, LOCALE_ID, Inject, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateUtil } from '../util/date.util';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  constructor(private dateUtil: DateUtil) {}

  transform(value: any, format?: any): any {
    if (!value) {
      return null;
    }
    if (format === 'date') {
      return this.dateUtil.formatDateRange(value);
    }
    if (format === 'time') {
      return this.dateUtil.formatTimeRange(value);
    }
    return this.dateUtil.formatDateTimeRange(value);
  }


}
