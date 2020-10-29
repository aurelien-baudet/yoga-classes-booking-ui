import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { ServerConfig } from 'src/environments/config';
import { HttpClient } from '@angular/common/http';
import { SendReport } from './../../domain/messages';
import { ScheduledClass } from 'src/app/booking/domain/reservation';
import { MessageService } from '../message.service';

@Injectable()
export class RestMessageService implements MessageService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) {}

  async sendMessageToApprovedStudents(scheduledClass: ScheduledClass, message: string): Promise<SendReport[]> {
    return await this.http.post<SendReport[]>(`${this.serverConfig.url}/messages/${scheduledClass.id}`,
        {message},
        {params: {approved: 'true'}})
      .pipe(first())
      .toPromise();
  }
}
