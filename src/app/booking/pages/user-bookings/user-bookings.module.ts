import { BookingComponentsModule } from 'src/app/booking/components/booking-components.module';
import { CommonComponentsModule } from './../../../common/components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserBookingsPage } from './user-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonComponentsModule,
    BookingComponentsModule,
   ],
  declarations: [UserBookingsPage]
})
export class UserBookingsPageModule {}
