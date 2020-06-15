import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceUnavailablePage } from './service-unavailable.page';

describe('ServiceUnavailablePage', () => {
  let component: ServiceUnavailablePage;
  let fixture: ComponentFixture<ServiceUnavailablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceUnavailablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceUnavailablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
