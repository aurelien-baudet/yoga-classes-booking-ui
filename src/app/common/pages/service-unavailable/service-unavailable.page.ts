import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-unavailable',
  templateUrl: './service-unavailable.page.html',
  styleUrls: ['./service-unavailable.page.scss'],
})
export class ServiceUnavailablePage {

  constructor(private navController: NavController) { }

  retry() {
    this.navController.back();
  }

}
