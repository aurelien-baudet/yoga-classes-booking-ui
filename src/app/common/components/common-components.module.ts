import { ToastrModule, ToastContainerModule, ToastNoAnimationModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DateRangePipe } from './date-range.pipe';
import { HelpButtonComponent } from './help-button/help-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';

@NgModule({
  declarations: [
    HelpButtonComponent,
    NotificationComponent,
    DateRangePipe
  ],
  entryComponents: [
    NotificationComponent
  ],
  exports: [
    HelpButtonComponent,
    NotificationComponent,
    DateRangePipe
  ],
  providers: [
    NotificationService
  ],
  imports: [
    CommonModule,
    IonicModule,
    ToastContainerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule
  ]
})
export class CommonComponentsModule { }
