import { Platform } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss'],
})
export class InstallComponent {
  @Input()
  closeable = false;
  @Input()
  message = `Rejoignez-nous sur l'application`;

  closed = false;

  constructor(private platform: Platform) { }

  isAndroidWeb() {
    return this.platform.is('android') && this.platform.is('mobileweb');
  }

  isIPhoneWeb() {
    return this.platform.is('ios') && this.platform.is('mobileweb');
  }

}
