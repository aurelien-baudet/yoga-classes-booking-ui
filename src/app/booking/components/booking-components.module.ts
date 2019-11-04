import { BookingHelperComponent } from './booking-helper/booking-helper.component';
import { WaitingStudentsComponent } from './class-details/waiting-students.component';
import { CommonComponentsModule } from './../../common/components/common-components.module';
import { RegisterFriendComponent } from './register-friend/register-friend.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassesComponent } from './classes/classes.component';
import { ScheduledClassCardComponent } from './scheduled-class-card/scheduled-class-card.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ApprovedStudentsComponent } from './class-details/approved-students.component';

@NgModule({
  declarations: [
    ScheduledClassCardComponent,
    ClassesComponent,
    ApprovedStudentsComponent,
    WaitingStudentsComponent,
    ClassDetailsComponent,
    RegisterFriendComponent,
    BookingHelperComponent
  ],
  exports: [
    ScheduledClassCardComponent,
    ClassesComponent,
    ApprovedStudentsComponent,
    WaitingStudentsComponent,
    ClassDetailsComponent,
    RegisterFriendComponent,
    BookingHelperComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommonComponentsModule,
    AutoCompleteModule
  ]
})
export class BookingComponentsModule { }
