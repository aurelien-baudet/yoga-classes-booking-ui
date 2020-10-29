import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { SendMessageFormComponent } from './send-message-form/send-message-form.component';
import { SendReportComponent } from './send-report/send-report.component';
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
    StudentSubscriptionsFormComponent,
    SendReportComponent,
    SendMessageFormComponent,
    TeacherFormComponent
  ],
  exports: [
    UnscheduledLessonCardComponent,
    LessonFormComponent,
    StudentSubscriptionsFormComponent,
    SendReportComponent,
    SendMessageFormComponent,
    TeacherFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule
  ]
})
export class AdminComponentsModule { }
