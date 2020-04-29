import { Instant } from '../../booking/domain/general';
import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateUtil } from '../util/date.util';

@Pipe({
  name: 'timeRange'
})
export class TimeRangePipe implements PipeTransform {
  constructor(private dateUtil: DateUtil) {}

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    return this.dateUtil.formatTimeRange(value);
  }


}
