import { ApplicationError } from 'src/app/booking/domain/general';
import { SendReport } from './../../domain/messages';
import { StudentRef } from './../../../account/domain/student';
import { ScheduledClass, isCanceled } from './../../../booking/domain/reservation';
import { CurrentRoute } from './../../../common/util/router.util';
import { ClassService } from 'src/app/booking/services/class.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage {
  scheduledClass: ScheduledClass;
  students: StudentRef[];
  reports: SendReport[];
  sending: boolean;
  loading = true;
  sendErrors: ApplicationError[];

  constructor(private classService: ClassService,
              private route: CurrentRoute,
              private messageService: MessageService) { }

  async ionViewDidEnter() {
    this.loading = true;
    const scheduledClassId = this.route.getPathParam('classId');
    this.scheduledClass = await this.classService.getClassInfo({id: scheduledClassId});
    this.students = this.scheduledClass.bookings.approved.map(b => b.student);
    this.reports = null;
    this.sending = false;
    this.loading = false;
  }


  async sendMessage(message: string) {
    try {
      this.sendErrors = null;
      this.reports = null;
      this.sending = true;
      this.reports = await this.messageService.sendMessageToApprovedStudents(this.scheduledClass, message);
      this.sending = false;
    } catch (e) {
      this.sendErrors = [e];
    }
  }

  isCanceled(scheduledClass: ScheduledClass) {
    return isCanceled(scheduledClass);
  }

  getCanceledMessage(scheduledClass: ScheduledClass) {
    return isCanceled(scheduledClass) ? {message: scheduledClass.state.message} : null;
  }

  getApprovedBookings(scheduledClass: ScheduledClass) {
    return scheduledClass.bookings.approved;
  }

  getWaitingBookings(scheduledClass: ScheduledClass) {
    return scheduledClass.bookings.waiting;
  }
}
