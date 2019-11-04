import { ToastController } from '@ionic/angular';
import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NotificationComponent } from './notification.component';

@Injectable()
export class NotificationService {
    constructor(private toastr: ToastrService) { }

    success(template: TemplateRef<any>, templateContext: any, title?: string, override?: Partial<IndividualConfig>) {
        const toast = this.toastr.success(null, title, {
            ...override,
            timeOut: 10000,
            closeButton: true,
            enableHtml: true,
            toastComponent: NotificationComponent,
            template,
            templateContext,
            // disableTimeOut: true
        } as any);
    }

    warn(template: TemplateRef<any>, templateContext: any, title?: string, override?: Partial<IndividualConfig>) {
        const toast = this.toastr.warning(null, title, {
            ...override,
            timeOut: 10000,
            closeButton: true,
            enableHtml: true,
            toastComponent: NotificationComponent,
            template,
            templateContext,
            // disableTimeOut: true
        } as any);
    }
}
