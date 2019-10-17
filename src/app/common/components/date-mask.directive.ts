import { DateUtil } from '../util/date.util';
import { Directive, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { IonInput } from '@ionic/angular';
import { takeUntil, delay, last } from 'rxjs/operators';

@Directive({
  selector: '[appDateMask]',
  providers: [IonInput],
})
export class DateMaskDirective implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(public ionInput: IonInput,
              private dateUtil: DateUtil) { }

  public ngOnInit() {
    this.configureInput();
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
  }

  public async configureInput() {
    const input = await this.ionInput.getInputElement();
    this.ionInput.ionChange
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: CustomEvent) => {
        const { value } = event.detail;
        input.value = this.dateUtil.formatDateString(value, true);
        this.ionInput.value = input.value;
      });
    this.ionInput.ionBlur
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: CustomEvent) => {
        const { value } = input;
        input.value = this.dateUtil.formatDateString(value);
        this.ionInput.value = input.value;
      });
  }
}