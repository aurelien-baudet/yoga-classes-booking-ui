import { AccountComponentsModule } from './../../components/account-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WhoAreYouPage } from './who-are-you.page';

const routes: Routes = [
  {
    path: '',
    component: WhoAreYouPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccountComponentsModule
  ],
  declarations: [WhoAreYouPage]
})
export class WhoAreYouPageModule {}
