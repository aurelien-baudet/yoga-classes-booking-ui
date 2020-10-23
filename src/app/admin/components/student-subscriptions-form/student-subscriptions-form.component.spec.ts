import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentSubscriptionsFormComponent } from './student-subscriptions-form.component';

describe('StudentSubscriptionsFormComponent', () => {
  let component: StudentSubscriptionsFormComponent;
  let fixture: ComponentFixture<StudentSubscriptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSubscriptionsFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSubscriptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
