import { AdminComponentsModule } from './../../components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassesPage } from './classes.page';
import { BookingComponentsModule } from 'src/app/booking/components/booking-components.module';

const routes: Routes = [
  {
    path: '',
    component: ClassesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BookingComponentsModule,
    AdminComponentsModule
  ],
  declarations: [ClassesPage]
})
export class ClassesPageModule {}
