import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NetworkUnavailablePage } from './network-unavailable.page';

describe('NetworkUnavailablePage', () => {
  let component: NetworkUnavailablePage;
  let fixture: ComponentFixture<NetworkUnavailablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkUnavailablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkUnavailablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
