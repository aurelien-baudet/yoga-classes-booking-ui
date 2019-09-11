import { CalendarComponent } from './calendar/calendar.component';
import { PopoverService } from 'src/app/common/components/popover/popover.service';
import { PopoverComponent } from './popover/popover.component';
import { ToastrModule, ToastContainerModule, ToastNoAnimationModule } from 'ngx-toastr';
import { DateRangePipe } from './date-range.pipe';
import { HelpButtonComponent } from './help-button/help-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { FormsModule } from '@angular/forms';
import { CalendarModule  } from 'ion4-calendar';
import { TimeMaskDirective } from './time-mask.directive';
import { PlaceDetailsComponent } from './place-details/place-details.component';


@NgModule({
  declarations: [
    HelpButtonComponent,
    NotificationComponent,
    PopoverComponent,
    DateRangePipe,
    CalendarComponent,
    TimeMaskDirective,
    PlaceDetailsComponent
  ],
  entryComponents: [
    PopoverComponent,
    NotificationComponent
  ],
  exports: [
    HelpButtonComponent,
    PopoverComponent,
    NotificationComponent,
    DateRangePipe,
    CalendarComponent,
    PlaceDetailsComponent
  ],
  providers: [
    NotificationService,
    PopoverService
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ToastContainerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule,
    CalendarModule,
  ]
})
export class CommonComponentsModule { }
