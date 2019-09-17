import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place, Image } from 'src/app/booking/domain/reservation';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss'],
})
export class PlaceDetailsComponent {
  @Input()
  place: Place;

  @Output()
  showPlan = new EventEmitter<Place>();
  @Output()
  showItinerary = new EventEmitter<Place>();

  constructor(private sanitizer: DomSanitizer) { }

  getInteractiveMap(maps: Image[]) {
    return maps.find((m) => m.type === 'INTERACTIVE_MAP');
  }
}
