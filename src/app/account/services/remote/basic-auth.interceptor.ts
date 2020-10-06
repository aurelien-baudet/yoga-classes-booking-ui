import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthenticationStorage } from '../authentication.storage';
import { mapTo, flatMap, map } from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationStore: AuthenticationStorage) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        return from(this.authenticationStore.get())
            .pipe(
                map((token) => this.addAuthorizationHeader(request, token)),
                flatMap((r) => next.handle(r))
            );
    }

    private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${token}`,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
        }
        return request;
    }
}