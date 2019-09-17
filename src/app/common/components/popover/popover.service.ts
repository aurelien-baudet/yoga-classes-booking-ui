import { style } from '@angular/animations';
import { PopoverController } from '@ionic/angular';
import { TemplateRef, Injectable, ComponentRef } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { Components, OverlayEventDetail, PopoverOptions } from '@ionic/core';
import { Subject } from 'rxjs';


export class PopoverWrapper {
    private $canceled = new Subject<OverlayEventDetail<any>>();
    private $succeded = new Subject<OverlayEventDetail<any>>();
    private $closed = new Subject<OverlayEventDetail<any>>();

    constructor(private popover: Components.IonPopover) {
        popover.onDidDismiss().then((value) => {
            if (value.role === 'backdrop' || value.role === 'canceled') {
                this.$canceled.next(value);
            } else {
                this.$succeded.next(value);
            }
            this.$closed.next(value);
        });
    }

    async cancel(data?: any, role?: string) {
        this.popover.dismiss(data, role || 'canceled');
    }

    async success(data?: any, role?: string) {
        this.popover.dismiss(data, role);
    }

    async onDidDismiss() {
        return new Promise((resolve, reject) => {
            this.$succeded.subscribe((data) => resolve(data));
            this.$canceled.subscribe((data) => reject(data));
        });
    }

    async onCanceled() {
        return new Promise((resolve) => {
            this.$canceled.subscribe((data) => resolve(data));
        });
    }

    async onSuccess() {
        return new Promise((resolve) => {
            this.$succeded.subscribe((data) => resolve(data));
        });
    }
}

@Injectable()
export class PopoverService {
    constructor(private popoverController: PopoverController) { }

    async show(template: TemplateRef<any>, templateContext: any, event?: Event, opts?: PopoverOptions): Promise<PopoverWrapper> {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            componentProps: {
                template,
                templateContext
            },
            event,
            ...opts
        });
        popover.present();
        return new PopoverWrapper(popover);
    }

    async dismiss(data?: any, role?: string, id?: string): Promise<void> {
        return this.popoverController.dismiss(data, role, id);
    }
}

