import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendReportComponent } from './send-report.component';

describe('SendReportComponent', () => {
  let component: SendReportComponent;
  let fixture: ComponentFixture<SendReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendReportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
