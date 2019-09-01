import { NotificationComponent } from './common/components/notification/notification.component';
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

import { ToastrModule, ToastContainerModule, ToastNoAnimationModule } from 'ngx-toastr';

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
import { NotificationService } from './common/components/notification/notification.service';
import { CommonComponentsModule } from './common/components/common-components.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CurrentRoute,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ClassService, useClass: RestClassService },
    { provide: BookingService, useClass: RestBookingService },
    { provide: AccountService, useClass: RestAccountService },
    { provide: ServerConfig, useValue: environment.server },
    { provide: AuthenticationStorage, useClass: AuthenticationInSessionStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
