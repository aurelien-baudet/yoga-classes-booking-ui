import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSubscriptionsPage } from './edit-subscriptions.page';

describe('EditSubscriptionsPage', () => {
  let component: EditSubscriptionsPage;
  let fixture: ComponentFixture<EditSubscriptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubscriptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSubscriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
