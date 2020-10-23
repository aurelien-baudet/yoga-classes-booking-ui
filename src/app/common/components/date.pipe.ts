import { Instant } from '../../booking/domain/general';
import { Pipe, PipeTransform, LOCALE_ID, Inject, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateUtil } from '../util/date.util';

@Pipe({
  name: 'localDate'
})
export class DatePipe implements PipeTransform {
  constructor(private dateUtil: DateUtil) {}

  transform(value: any, format?: any): any {
    if (!value) {
      return null;
    }
    return this.dateUtil.formatDate(value);
  }

}
