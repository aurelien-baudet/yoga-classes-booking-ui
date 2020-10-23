import { AdminComponentsModule } from './../../components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSubscriptionsPageRoutingModule } from './edit-subscriptions-routing.module';

import { EditSubscriptionsPage } from './edit-subscriptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSubscriptionsPageRoutingModule,
    AdminComponentsModule
  ],
  declarations: [EditSubscriptionsPage]
})
export class EditSubscriptionsPageModule {}
