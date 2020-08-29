import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationStorage } from '../authentication.storage';
import { CurrentRoute } from 'src/app/common/util/router.util';

@Injectable()
export class AccessDeniedInterceptor implements HttpInterceptor {
    constructor(private authenticationStorage: AuthenticationStorage,
                private router: Router,
                private route: CurrentRoute) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if (err.status === 403) {
                    console.log('user access denied by server so redirect to forbidden page');
                    // redirect to forbidden page
                    this.router.navigate(['errors', 'forbidden']);
                }

                return throwError(err);
            }));
    }
}
