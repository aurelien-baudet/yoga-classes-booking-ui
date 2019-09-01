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

@NgModule({
  declarations: [
    LoginFormComponent,
    SocialLoginComponent,
    UnregisteredInfoFormComponent,
    PreferencesComponent,
    RegisterComponent
  ],
  exports: [
    LoginFormComponent,
    SocialLoginComponent,
    UnregisteredInfoFormComponent,
    PreferencesComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule
  ]
})
export class AccountComponentsModule { }
