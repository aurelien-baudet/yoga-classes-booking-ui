import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-package-card',
  templateUrl: './class-package-card.component.html',
  styleUrls: ['./class-package-card.component.scss'],
})
export class ClassPackageCardComponent {
  @Input()
  remainingClasses: number;
  @Input()
  total = 5;

  expired() {
    return this.remainingClasses <= 0;
  }
  
  getProgress(): number {
    return (this.total - this.remainingClasses) / this.total;
  }
}
