import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScheduleLessonPage } from './schedule-lesson.page';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';

const routes: Routes = [
  {
    path: '',
    component: ScheduleLessonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonComponentsModule
  ],
  declarations: [ScheduleLessonPage]
})
export class ScheduleLessonPageModule {}
