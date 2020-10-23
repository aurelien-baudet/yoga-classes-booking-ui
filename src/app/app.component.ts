import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { AccountService } from 'src/app/account/services/account.service';
import { SplashScreenConfig } from 'src/environments/config';
import { hasRole, isAuthenticated, isRegisteredUser, isUnregisteredUser } from './account/domain/utils';
import { Role, User } from './account/domain/user';
import { PushNotificationService } from './account/services/push-notification.service';
import { ApplicationEventService } from './common/services/application-event.service';


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
              public keyboard: Keyboard,
              private splashScreenConfig: SplashScreenConfig,
              private storage: Storage) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.ready = true;
      this.accountService.currentUser$.subscribe(this.updateCurrentUser.bind(this));
      // load current user at startup to trigger observable (needed if current page doesn't request for it)
      this.accountService.getUserInfo();
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.show();
      this.splashScreen.hide();
      this.hideSplashcreen();
    });
  }

  private async hideSplashcreen() {
    const first = !(await this.storage.get('splash-displayed'));
    setTimeout(() => {
      document.getElementById('splashscreen').remove();
    }, this.splashScreenConfig.duration[first ? 'first' : 'next']);
    this.storage.set('splash-displayed', true);
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
