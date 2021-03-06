import { CurrentRoute } from 'src/app/common/util/router.util';
import { User } from 'src/app/account/domain/user';
import { Role } from './../domain/user';
import { AccountService } from 'src/app/account/services/account.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { hasRole, isUnregisteredUser } from '../domain/utils';

@Injectable({ providedIn: 'root' })
export class RedirectUserGuard implements CanActivate {
    constructor(private router: Router,
                private accountService: AccountService,
                private currentRoute: CurrentRoute) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.url.length !== 0) {
            return true;
        }

        // user not connected => redirect to homepage (visible by everyone)
        const currentUser = await this.accountService.getUserInfo();
        if (!currentUser) {
            console.log('user not connected => redirect to homepage (visible by everyone)', currentUser);
            this.router.navigate(['lessons'], {
                queryParamsHandling: 'preserve'
            });
            return false;
        }

        // not connected but user has provided some personal information to identify himself
        if (isUnregisteredUser(currentUser)) {
            console.log('not connected but user has provided some personal information to identify himself', currentUser);
            this.router.navigate(['lessons'], {
                queryParamsHandling: 'preserve'
            });
            return false;
        }

        // user connected
        // if teacher => go to teacher homepage
        // if user => go to user homepage
        if (hasRole(currentUser as User, Role.TEACHER)) {
            console.log('user connected as teacher so redirect to teacher homepage', currentUser);
            this.router.navigate(['admin', 'classes'], {
                queryParamsHandling: 'preserve'
            });
            return false;
        }
        console.log('user connected as student so redirect to student homepage', currentUser);
        this.router.navigate(['lessons'], {
            queryParamsHandling: 'preserve'
        });
        return false;
    }
}