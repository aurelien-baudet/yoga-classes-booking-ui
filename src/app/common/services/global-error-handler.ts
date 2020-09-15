import { Router } from '@angular/router';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationError, Event } from '@angular/router';


@Injectable()
export class ErrorsService {
  constructor(private router: Router) {
    // Listen to the navigation errors
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationError) {
        this.handleError(event.error);
        return false;
      }
    });
  }

  handleError(error: any) {
    // TODO: send unexpected errors to server
    console.error(error);
    if (this.isOffline(error)) {
      this.router.navigate(['/errors/network-unavailable']);
      return;
    }
    if (this.isServerUnavailable(error)) {
      this.router.navigate(['/errors/service-unavailable']);
      return;
    }
    
  }

  private isOffline(error: any): boolean {
    return !navigator.onLine;
  }

  private isNetworkConnectionIssue(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      return false;
    }
    return error.status === 0;
  }

  private isServerUnavailable(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      return false;
    }
    return error.status === 0
            || error.status === 500
            || error.status === 502
            || error.status === 503;
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorsService) { }

  handleError(error: any): void {
    if (error['promise'] && error['rejection']) {
      this.errorService.handleError(error.rejection);
    }
  }

}
