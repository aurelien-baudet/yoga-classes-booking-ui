import { Component, OnInit, TemplateRef } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate('{{ easeTime }}ms {{ easing }}')
      ),
      transition(
        'active => removed',
        animate('{{ easeTime }}ms {{ easing }}')
      )
    ])
  ],
})
export class NotificationComponent extends Toast {
  template: TemplateRef<any>;
  templateContext = {};

  constructor(protected toastrService: ToastrService,
              public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
    this.template = (this.toastPackage.config as any).template;
    this.templateContext = (this.toastPackage.config as any).templateContext;
  }
}
