import { BookingComponentsModule } from './../../../booking/components/booking-components.module';
import { AdminComponentsModule } from './../../components/admin-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendMessagePageRoutingModule } from './send-message-routing.module';

import { SendMessagePage } from './send-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendMessagePageRoutingModule,
    AdminComponentsModule,
    BookingComponentsModule
  ],
  declarations: [SendMessagePage]
})
export class SendMessagePageModule {}
