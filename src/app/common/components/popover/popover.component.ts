import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input()
  template: any;
  @Input()
  templateContext: any;
  @Input()
  close = () => {}
}
