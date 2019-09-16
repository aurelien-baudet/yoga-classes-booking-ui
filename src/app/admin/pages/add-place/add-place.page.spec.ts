import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlacePage } from './add-place.page';

describe('AddPlacePage', () => {
  let component: AddPlacePage;
  let fixture: ComponentFixture<AddPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
