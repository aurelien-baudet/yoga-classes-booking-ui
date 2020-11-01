import { ClassPackageCardComponent } from './class-package-card/class-package-card.component';
import { PeriodCardComponent } from './period-card/period-card.component';
import { StudentSubscriptionsComponent } from './student-subscriptions/student-subscriptions.component';
import { CommonComponentsModule } from './../../common/components/common-components.module';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login/login-form.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from './preferences/preferences.component';
import { RegisterComponent } from './signup/register-student-form.component';
import { SocialLoginComponent } from './login/social-login.component';
import { UnregisteredInfoFormComponent } from './login/unregistered-info-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    SocialLoginComponent,
    UnregisteredInfoFormComponent,
    PreferencesComponent,
    RegisterComponent,
    StudentSubscriptionsComponent,
    PeriodCardComponent,
    ClassPackageCardComponent,
    ProfileFormComponent
  ],
  exports: [
    LoginFormComponent,
    SocialLoginComponent,
    UnregisteredInfoFormComponent,
    PreferencesComponent,
    RegisterComponent,
    StudentSubscriptionsComponent,
    PeriodCardComponent,
    ClassPackageCardComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule
  ]
})
export class AccountComponentsModule { }
