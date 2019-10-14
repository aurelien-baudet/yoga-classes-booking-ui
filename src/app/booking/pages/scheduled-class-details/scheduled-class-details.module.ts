import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScheduledClassDetailsPage } from './scheduled-class-details.page';
import { BookingComponentsModule } from '../../components/booking-components.module';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';

const routes: Routes = [
  {
    path: '',
    component: ScheduledClassDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentsModule,
    BookingComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScheduledClassDetailsPage]
})
export class ScheduledClassDetailsPageModule {}
