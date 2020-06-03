import { Role } from 'src/app/account/domain/user';
import { AccountService } from 'src/app/account/services/account.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { hasRole, isUnregisteredUser } from '../domain/utils';

@Injectable({ providedIn: 'root' })
export class TeacherAuthRequiredGuard implements CanActivate {
    constructor(private router: Router,
                private accountService: AccountService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = await this.accountService.getTeacherInfo();
        if (currentUser && hasRole(currentUser, Role.TEACHER)) {
            // logged in so return true
            return true;
        }

        if (currentUser && isUnregisteredUser(currentUser)) {
            // forbidden
            console.log('unregistered users are not allowed to access teacher pages', currentUser);
            this.router.navigate(['errors', 'forbidden']);
            return false;
        }
        if (currentUser && hasRole(currentUser, Role.STUDENT)) {
            // forbidden
            console.log('students are not allowed to access teacher pages', currentUser);
            this.router.navigate(['errors', 'forbidden']);
            return false;
        }

        // not logged in as teacher so redirect to login page with the return url
        console.log('not logged in as teacher so redirect to login page with the return url', currentUser);
        this.router.navigate(['users', 'login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
