import { StudentSubscriptionsFormComponent } from './student-subscriptions-form/student-subscriptions-form.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnscheduledLessonCardComponent } from './unscheduled-lesson-card/unscheduled-lesson-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    UnscheduledLessonCardComponent,
    LessonFormComponent,
    StudentSubscriptionsFormComponent
  ],
  exports: [
    UnscheduledLessonCardComponent,
    LessonFormComponent,
    StudentSubscriptionsFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class AdminComponentsModule { }
