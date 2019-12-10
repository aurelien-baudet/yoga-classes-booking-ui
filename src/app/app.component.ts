import { ApplicationEventService } from './common/services/application-event.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { User, isRegisteredUser, isAuthenticated, hasRole, Role, isUnregisteredUser, isUnknown } from './account/domain/user';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Component } from '@angular/core';

import { Platform, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushNotificationService } from './account/services/push-notification.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private ready = false;
  currentUser: User | UnregisteredUser | null;

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private accountService: AccountService,
              private menuController: MenuController,
              private router: Router,
              private pushNotificationService: PushNotificationService,
              private applicationEventService: ApplicationEventService,
              public keyboard: Keyboard) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.ready = true;
      this.accountService.currentUser$.subscribe(this.updateCurrentUser.bind(this));
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

  private async updateCurrentUser(user: User) {
    console.log('[app.component] update current user', user);
    this.currentUser = user;
    await this.pushNotificationService.registerCurrentDeviceForUser(user);
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

  refresh() {
    this.applicationEventService.refreshBookings.emit();
  }

  close() {
    this.menuController.close();
  }

  isKeyboardVisible() {
    if (!this.ready) {
      return false;
    }
    if (!this.platform.is('cordova')) {
      return false;
    }
    return this.keyboard.isVisible;
  }
}
