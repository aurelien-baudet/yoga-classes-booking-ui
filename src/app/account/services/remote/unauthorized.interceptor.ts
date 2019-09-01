import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationStorage } from '../authentication.storage';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(private authenticationStorage: AuthenticationStorage) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationStorage.clear();
                    // TODO: redirect to particular page ?
                }

                return throwError(err);
            }));
    }
}
