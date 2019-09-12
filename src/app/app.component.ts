import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { User, isRegisteredUser, isAuthenticated, hasRole, Role, isUnregisteredUser, isUnknown } from './account/domain/user';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private currentUser: User | UnregisteredUser | null;

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private accountService: AccountService,
              private menuController: MenuController,
              private router: Router) {
    this.initializeApp();
    this.accountService.currentUser$.subscribe((user) => this.currentUser = user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isAuthenticated() {
    return isAuthenticated(this.currentUser);
  }

  isRegistered() {
    return isRegisteredUser(this.currentUser);
  }

  isStudent() {
    if (!this.isAuthenticated()) {
      return false;
    }
    if (isUnregisteredUser(this.currentUser)) {
      return true;
    }
    return hasRole(this.currentUser as User, Role.STUDENT);
  }

  isTeacher() {
    if (!this.isAuthenticated()) {
      return false;
    }
    if (isUnregisteredUser(this.currentUser)) {
      return false;
    }
    return hasRole(this.currentUser as User, Role.TEACHER);
  }

  async logout() {
    await this.accountService.logout();
    this.router.navigateByUrl('/', {queryParams: {}, queryParamsHandling: ''});
  }

  close() {
    this.menuController.close();
  }
}
