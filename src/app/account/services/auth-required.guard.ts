import { CurrentRoute } from './../../common/util/router.util';
import { AccountService } from 'src/app/account/services/account.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthRequiredGuard implements CanActivate {
    constructor(private router: Router,
                private accountService: AccountService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = await this.accountService.getUserInfo();
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // // not logged but already on login page
        // if (route.url.some((s) => s.path === 'login')) {
        //     return true;
        // }

        // not logged in so redirect to login page with the return url
        console.log('not logged in so redirect to login page with the return url', currentUser);
        this.router.navigate(['users', 'login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}