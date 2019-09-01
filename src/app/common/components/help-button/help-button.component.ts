import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent {
  @Input()
  message: string;
}
