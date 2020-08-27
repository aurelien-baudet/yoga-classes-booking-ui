import { MockPreferencesService } from './account/services/mocks/mock-preferences.service';
import { PreferencesService } from 'src/app/account/services/preferences.service';
import { RestPreferencesService } from './account/services/remote/rest-preferences.service';
import { OnesignalPushNotificationService } from './account/services/remote/onesignal-push-notification.service';
import { UnregisteredUserIonicLocalStorage } from './account/services/local/unregistered-user-info-ionic-local-storage.storage';
import { AuthenticationIonicLocalStorage } from './account/services/local/authentication-ionic-local-storage.storage';
import { MockAccountService } from './account/services/mocks/mock-account.service';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { BasicAuthInterceptor } from './account/services/remote/basic-auth.interceptor';
import { AccountService } from './account/services/account.service';
import { ClassService } from './booking/services/class.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonIcon, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingService } from './booking/services/booking.service';
import { RestClassService } from './booking/services/remote/rest-class.service';
import { RestBookingService } from './booking/services/remote/rest-booking.service';
import { RestAccountService } from './account/services/remote/rest-account.service';
import { ServerConfig, OneSignalConfig, SplashScreenConfig } from 'src/environments/config';
import { environment } from 'src/environments/environment';
import { AuthenticationStorage } from './account/services/authentication.storage';
import { UnauthorizedInterceptor } from './account/services/remote/unauthorized.interceptor';
import { CommonComponentsModule } from './common/components/common-components.module';
import { PlaceService } from './admin/services/place.service';
import { RestPlaceService } from './admin/services/remote/rest-place.service';
import { DateUtil, TIMEZONE } from './common/util/date.util';
import { MockClassService } from './booking/services/mocks/mock-class.service';
import { MockBookingService } from './booking/services/mocks/mock-booking.service';
import { MockPlaceService } from './admin/services/mocks/mock-place.service';
import { UnregisteredUserInfoStorage } from './account/services/unregistered-user-info.storage';
import { PushNotificationService } from './account/services/push-notification.service';
import { IonicStorageModule } from '@ionic/storage';
import { ApplicationEventService } from './common/services/application-event.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import { Calendar } from '@ionic-native/calendar/ngx';
import localeFr from '@angular/common/locales/fr';
import { CalendarService } from './common/services/calendar.service';
import { NativeCalendarService } from './common/services/local/native-calendar.service';
import { GoogleCalendarService } from './common/services/local/google-calendar.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler, ErrorsService } from 'src/app/common/services/global-error-handler';


registerLocaleData(localeFr);

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

export const calendarServiceFactory = (platform: Platform, nativeCalendar: Calendar, dateUtil: DateUtil) => {
  if (platform.is('mobile')) {
    console.log('using native calendar');
    return new NativeCalendarService(nativeCalendar, dateUtil);
  }
  // TODO: provide other calendars ?
  console.log('using web calendar');
  return new GoogleCalendarService(dateUtil);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'yoga-saint-pierre'
    }),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient]
    //   }
    // }),
    AppRoutingModule,
    HttpClientModule,
    CommonComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: TIMEZONE, useValue: 'UTC+4' },
    StatusBar,
    SplashScreen,
    CurrentRoute,
    DateUtil,
    OneSignal,
    Keyboard,
    InAppBrowser,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: PlaceService, useClass: environment.mock ? MockPlaceService : RestPlaceService },
    { provide: ClassService, useClass: environment.mock ? MockClassService : RestClassService },
    { provide: BookingService, useClass: environment.mock ? MockBookingService : RestBookingService },
    { provide: AccountService, useClass: environment.mock ? MockAccountService : RestAccountService },
    { provide: PreferencesService, useClass: environment.mock ? MockPreferencesService : RestPreferencesService },
    { provide: PushNotificationService, useClass: OnesignalPushNotificationService },
    { provide: ServerConfig, useValue: environment.server },
    { provide: OneSignalConfig, useValue: environment.onesignal },
    { provide: SplashScreenConfig, useValue: environment.splashscreen },
    { provide: AuthenticationStorage, useClass: AuthenticationIonicLocalStorage },
    { provide: UnregisteredUserInfoStorage, useClass: UnregisteredUserIonicLocalStorage },
    ApplicationEventService,
    Calendar,
    { provide: CalendarService, deps: [Platform, Calendar, DateUtil], useFactory: calendarServiceFactory },
    ErrorsService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
