import { SendReport, MessageStatus, getFailureText } from './../../domain/messages';
import { StudentRef } from 'src/app/account/domain/student';
import { Component, OnInit, Input } from '@angular/core';
import { isSameUser } from 'src/app/account/domain/utils';

interface StatusAndType {
  type: 'mobile-notification' | 'email' | 'sms';
  status: MessageStatus;
}

@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.scss'],
})
export class SendReportComponent {
  @Input()
  students: StudentRef[];
  @Input()
  reports: SendReport[];
  @Input()
  loading: boolean;

  isSendingTo(student: StudentRef): boolean {
    const report = this.getReportFor(student);
    if (!report) {
      return false;
    }
    return report.sending;
  }

  getStatuses(student: StudentRef): StatusAndType[] {
    return [
      {type: 'mobile-notification', status: this.getReportFor(student).pushNotification},
      {type: 'email', status: this.getReportFor(student).email},
      {type: 'sms', status: this.getReportFor(student).sms}
    ];
  }

  getReportFor(student: StudentRef): SendReport {
    if (!this.reports) {
      return null;
    }
    return this.reports.find((r) => isSameUser(r.student, student));
  }

  hasFailed(status: MessageStatus): boolean {
    if (!status) {
      return false;
    }
    return !!status.failure;
  }

  hasSucceeded(status: MessageStatus): boolean {
    if (!status) {
      return false;
    }
    return status.sent;
  }

  getStatusText(statusAndType: StatusAndType): string {
    if (!statusAndType.status) {
      return `${this.toText(statusAndType.type)} n'a pas été envoyé (envoyé par un autre moyen ou information manquante pour pouvoir l'envoyer)`;
    }
    if (this.hasSucceeded(statusAndType.status)) {
      return `${this.toText(statusAndType.type)} a été envoyé avec succès`;
    }
    if (this.hasFailed(statusAndType.status)) {
      return `${this.toText(statusAndType.type)} n'a pas pu être envoyé : ${this.getFailureCause(statusAndType.status)}`;
    }
    return '';
  }

  getFailureCause(status: MessageStatus): string {
    if (!status) {
      return '';
    }
    if (!this.hasFailed(status)) {
      return '';
    }
    return getFailureText(status.failure);
  }

  getIcon(statusAndType: StatusAndType): string {
    return `app-${statusAndType.type}`;
  }

  getCssClass(statusAndType: StatusAndType): string {
    return statusAndType.type;
  }

  private toText(type: string) {
    if (type === 'mobile-notification') {
      return 'La notification mobile';
    }
    if (type === 'email') {
      return `L'email`;
    }
    if (type === 'sms') {
      return 'Le SMS';
    }
  }

}
