import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddLessonPage } from './add-lesson.page';
import { AdminComponentsModule } from '../../components/admin-components.module';

const routes: Routes = [
  {
    path: '',
    component: AddLessonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonComponentsModule,
    AdminComponentsModule
  ],
  declarations: [AddLessonPage]
})
export class AddLessonPageModule {}
