import { DateRange, isSameDay } from './../../../booking/domain/general';
import { ScheduledClass, Lesson, sameClassPredicate } from 'src/app/booking/domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Instant } from 'src/app/booking/domain/general';
import { PopoverService, PopoverWrapper } from '../popover/popover.service';
import { Components } from '@ionic/core';
import { DateUtil } from '../../util/date.util';

interface DayConfig {
  date: Date;
  marked?: boolean;
  disable?: boolean;
  title?: string;
  subTitle?: string;
  cssClass?: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input()
  lesson: Lesson;
  @Input()
  set scheduledClasses(scheduledClasses: ScheduledClass[]) {
    this._scheduledClasses = scheduledClasses;
    this.selectedDates = scheduledClasses.map((c) => this.dateUtil.startOfDay(c.start));
    this.refreshDaysConfig();
  }
  @Input()
  pending: ScheduledClass[];

  @Output()
  schedule = new EventEmitter<{lesson: Lesson} & DateRange>();

  @ViewChild('selectHours')
  private selectHours: TemplateRef<any>;
  private _scheduledClasses: ScheduledClass[];
  protected daysConfig: DayConfig[] = [];
  protected selectedDates: Date[] = [];
  protected lastClick: Event;
  private popover: PopoverWrapper;

  constructor(private popoverService: PopoverService,
              private dateUtil: DateUtil) { }

  chooseHours(date: number) {
    // wrap in setTimeout in order to be able to retrieve the click event
    setTimeout(async () => {
      this.popover = await this.popoverService.show(this.selectHours, {
        date,
        hours: {
          start: this.getStartHour(date),
          end: this.getEndHour(date)
        }
      }, this.lastClick);
      this.popover.onDidDismiss().catch(() => this.unselect(date));
    }, 0);
  }

  setHours(date: number, hours: {start: string, end: string}) {
    // TODO: handle edition of hours and trigger unschedule/update event ?
    this.popover.success();
    this.schedule.emit({
      lesson: this.lesson,
      start: this.setHour(date, hours.start).valueOf(),
      end: this.setHour(date, hours.end).valueOf()
    });
  }

  private getStartHour(date: number) {
    const found = this.findMatchingScheduledClass(date);
    if (!found) {
      return '';
    }
    return this.dateUtil.formatHour(found.start);
  }

  private getEndHour(date: number) {
    const found = this.findMatchingScheduledClass(date);
    if (!found) {
      return '';
    }
    return this.dateUtil.formatHour(found.end);
  }

  private findMatchingScheduledClass(date: number) {
    return (this._scheduledClasses || []).find((c) => isSameDay(c.start, date));
  }

  private unselect(date: number) {
    this.scheduledClasses = this._scheduledClasses || [];
  }

  private setHour(date: number, hour: string): Date {
    const [_, h, m] = /(\d{1,2})h?(\d{0,2})/.exec(hour);
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(h, 10));
    dateTime.setMinutes(m ? parseInt(m, 10) : 0);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime;
  }

  private refreshDaysConfig() {
    this.daysConfig = (this._scheduledClasses || []).map((c) => ({
      date: this.dateUtil.startOfDay(c.start),
      subTitle: this.dateUtil.formatTimeRange(c),
      cssClass: (this.pending || []).some(sameClassPredicate(c)) ? 'pending' : ''
    }));
  }
}
