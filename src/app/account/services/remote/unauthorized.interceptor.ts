import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationStorage } from '../authentication.storage';
import { CurrentRoute } from 'src/app/common/util/router.util';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(private authenticationStorage: AuthenticationStorage,
                private router: Router,
                private route: CurrentRoute) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationStorage.clear();

                    // if already on login page do not redirect
                    if (this.route.matches('users/login') || this.route.matches('users/whoareyou')) {
                        console.log('user unauthorized by server but already on login page => skip');
                        return throwError(err);
                    }

                    console.log('user unauthorized by server so redirect to login page');
                    // redirect to login page
                    this.router.navigate(['users', 'login'], {
                        queryParams: { returnUrl: this.route.url() },
                        queryParamsHandling: 'merge'
                    });
                }

                return throwError(err);
            }));
    }
}
