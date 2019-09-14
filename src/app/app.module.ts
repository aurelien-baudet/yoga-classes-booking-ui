import { UnregisteredUserIonicLocalStorage } from './account/services/local/unregistered-user-info-ionic-local-storage.storage';
import { AuthenticationIonicLocalStorage } from './account/services/local/authentication-ionic-local-storage.storage';
import { FcmPushNotificationService } from './account/services/remote/rest-push-notification.service';
import { MockAccountService } from './account/services/mocks/mock-account.service';
import { CurrentRoute } from 'src/app/common/util/router.util';
import { BasicAuthInterceptor } from './account/services/remote/basic-auth.interceptor';
import { AuthenticationInSessionStorage } from './account/services/local/authentication-in-session-storage.storage';
import { AccountService } from './account/services/account.service';
import { ClassService } from './booking/services/class.service';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingService } from './booking/services/booking.service';
import { RestClassService } from './booking/services/remote/rest-class.service';
import { RestBookingService } from './booking/services/remote/rest-booking.service';
import { RestAccountService } from './account/services/remote/rest-account.service';
import { ServerConfig } from 'src/environments/config';
import { environment } from 'src/environments/environment';
import { AuthenticationStorage } from './account/services/authentication.storage';
import { UnauthorizedInterceptor } from './account/services/remote/unauthorized.interceptor';
import { CommonComponentsModule } from './common/components/common-components.module';
import { PlaceService } from './admin/services/place.service';
import { RestPlaceService } from './admin/services/remote/rest-place.service';
import { DateUtil } from './common/util/date.util';
import { MockClassService } from './booking/services/mocks/mock-class.service';
import { MockBookingService } from './booking/services/mocks/mock-booking.service';
import { MockPlaceService } from './admin/services/mocks/mock-place.service';
import { UnregisteredUserInfoStorage } from './account/services/unregistered-user-info.storage';
import { UnregisteredUserInfoInSessionStorage } from './account/services/local/unregistered-user-info-in-session-storage.storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { FCM } from '@ionic-native/fcm/ngx';
import { PushNotificationService } from './account/services/push-notification.service';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonComponentsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CurrentRoute,
    DateUtil,
    FCM,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: PlaceService, useClass: environment.mock ? MockPlaceService : RestPlaceService },
    { provide: ClassService, useClass: environment.mock ? MockClassService : RestClassService },
    { provide: BookingService, useClass: environment.mock ? MockBookingService : RestBookingService },
    { provide: AccountService, useClass: environment.mock ? MockAccountService : RestAccountService },
    { provide: PushNotificationService, useClass: FcmPushNotificationService },
    { provide: ServerConfig, useValue: environment.server },
    { provide: AuthenticationStorage, useClass: AuthenticationIonicLocalStorage },
    { provide: UnregisteredUserInfoStorage, useClass: UnregisteredUserIonicLocalStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
