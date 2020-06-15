import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetworkUnavailablePage } from './network-unavailable.page';


const routes: Routes = [
  {
    path: '',
    component: NetworkUnavailablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NetworkUnavailablePage]
})
export class NetworkUnavailablePageModule {}
