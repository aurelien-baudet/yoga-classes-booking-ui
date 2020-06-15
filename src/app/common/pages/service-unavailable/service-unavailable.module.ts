import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ServiceUnavailablePage } from './service-unavailable.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceUnavailablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiceUnavailablePage]
})
export class ServiceUnavailablePageModule {}
