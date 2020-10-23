import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubscriptionsPage } from './edit-subscriptions.page';

const routes: Routes = [
  {
    path: '',
    component: EditSubscriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubscriptionsPageRoutingModule {}
