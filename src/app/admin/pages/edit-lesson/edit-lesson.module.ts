import { AdminComponentsModule } from './../../components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditLessonPage } from './edit-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: EditLessonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AdminComponentsModule
  ],
  declarations: [EditLessonPage]
})
export class EditLessonPageModule {}
