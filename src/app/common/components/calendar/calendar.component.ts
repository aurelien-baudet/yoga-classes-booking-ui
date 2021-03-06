import { DateRange, isSameDay, Recurrence } from './../../../booking/domain/general';
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
  @Input()
  set firstDateToShow(day: Date) {
    // FIXME: display month of last viewed date (provided externally)
    this._firstDateToShow = this.dateUtil.startOfDay(day);
    console.log('firstDateToShow', this._firstDateToShow);
  }

  @Output()
  monthChanged = new EventEmitter<Date>();
  @Output()
  schedule = new EventEmitter<{lesson: Lesson} & DateRange &  {recurrence: Recurrence}>();

  @ViewChild('selectHours', { static: true })
  private selectHours: TemplateRef<any>;
  @ViewChild('recurrence', { static: true })
  private recurrence: TemplateRef<any>;
  public _scheduledClasses: ScheduledClass[];
  public _firstDateToShow: Date;
  public daysConfig: DayConfig[] = [];
  public selectedDates: Date[] = [];
  public lastClick: Event;
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
      }, {cssClass: 'select-hours'}, this.lastClick);
      this.popover.onDidDismiss().catch(() => this.unselect(date));
    }, 0);
  }

  async setHours(date: number, hours: {start: string, end: string}) {
    // TODO: handle edition of hours and trigger unschedule/update event ?
    await this.popover.success();
    this.popover = await this.popoverService.show(this.recurrence, {
      date,
      hours,
      recurrence: {
        frequency: 'week',
        until: this.dateUtil.formatDate(date + 4*7*24*60*60*1000)
      }
    }, {cssClass: 'recurrence'});
    this.popover.onDidDismiss().catch(() => this.unselect(date));
  }

  async chooseRecurrence(date: number, hours: {start: string, end: string}, recurrence: {frequency: string, until: string}) {
    await this.popover.success();
    this.schedule.emit({
      lesson: this.lesson,
      start: this.setHour(date, hours.start).valueOf(),
      end: this.setHour(date, hours.end).valueOf(),
      recurrence: {
        frequency: recurrence.frequency,
        until: this.dateUtil.parseDate(recurrence.until).valueOf()
      }
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
