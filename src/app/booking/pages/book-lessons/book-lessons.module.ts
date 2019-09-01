import { BookingComponentsModule } from './../../components/booking-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookLessonsPage } from './book-lessons.page';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';

const routes: Routes = [
  {
    path: '',
    component: BookLessonsPage
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
  declarations: [BookLessonsPage]
})
export class BookLessonsPageModule {}
