import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-unavailable',
  templateUrl: './network-unavailable.page.html',
  styleUrls: ['./network-unavailable.page.scss'],
})
export class NetworkUnavailablePage {
  private retryId;
  private nextRetry = 5000;
  remaining = this.nextRetry;

  constructor(private navController: NavController,
              private http: HttpClient) { }

  async ionViewDidEnter() {
    this.retryId = setInterval(() => {
      if (this.updateTimer()) {
        this.retry();
      }
    }, 1000);
  }

  updateTimer() {
    this.remaining -= 1000;
    return this.remaining <= 0;
  }

  resetTimer() {
    this.remaining = this.nextRetry;
  }

  async retry() {
    this.resetTimer();
    if (await this.connected()) {
      this.navController.back();
    }
  }

  async connected() {
    try {
      await this.http.options('https://cors-anywhere.herokuapp.com/').pipe(first()).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  ionViewWillLeave() {
    if (this.retryId) {
      clearInterval(this.retryId);
    }
    this.resetTimer();
  }

}
