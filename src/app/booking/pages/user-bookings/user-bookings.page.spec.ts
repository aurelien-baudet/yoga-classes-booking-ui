import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingsPage } from './user-bookings.page';

describe('UserBookingsPage', () => {
  let component: UserBookingsPage;
  let fixture: ComponentFixture<UserBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
