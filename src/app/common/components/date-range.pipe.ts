import { Instant } from './../../booking/domain/general';
import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateUtil } from '../util/date.util';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  constructor(private dateUtil: DateUtil) {}

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    return this.dateUtil.formatRange(value);
  }


}
