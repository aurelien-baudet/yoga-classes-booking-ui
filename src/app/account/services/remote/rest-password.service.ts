import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { matchesErrorCode, ApplicationError } from './../../../booking/domain/general';
import { ServerConfig } from './../../../../environments/config';
import { HttpClient } from '@angular/common/http';
import { PasswordService } from '../password.service';

@Injectable({
  providedIn: 'root'
})
export class RestPasswordService implements PasswordService {
  constructor(private http: HttpClient,
              private serverConfig: ServerConfig) { }

  async requestPasswordReset(contact: string): Promise<void> {
    await this.http.get(`${this.serverConfig.url}/users/password`, {params: {contact}})
      .pipe(first())
      .toPromise();
  }

  async validateResetCode(code: string): Promise<void> {
    try {
      await this.http.post(`${this.serverConfig.url}/users/password`, {}, {params: {code}})
        .pipe(first())
        .toPromise();
    } catch (e) {
      this.handleTokenError(e);
    }
  }

  async changePassword(code: string, newPassword: string): Promise<void> {
    try {
      await this.http.post(`${this.serverConfig.url}/users/password`, {token: code, newPassword})
        .pipe(first())
        .toPromise();
    } catch (e) {
      this.handleTokenError(e);
    }
  }

  private handleTokenError(e) {
    if (matchesErrorCode(e, 'INVALID_TOKEN')) {
      throw new ApplicationError('INVALID_TOKEN', 'Code is invalid', e);
    }
    if (matchesErrorCode(e, 'EXPIRED_TOKEN')) {
      throw new ApplicationError('EXPIRED_TOKEN', 'Code is expired', e);
    }
    throw e;
  }
}