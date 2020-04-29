import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { PopoverService } from '../popover/popover.service';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent {
  @Input()
  title: string;

  @ViewChild('content', { static: true })
  content: TemplateRef<any>;

  constructor(private popoverService: PopoverService) { }

  async showHelp(event) {
      await this.popoverService.show(this.content, {title: this.title}, event);
  }
}
