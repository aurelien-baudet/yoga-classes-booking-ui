import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenPage } from './forbidden.page';

describe('ForbiddenPage', () => {
  let component: ForbiddenPage;
  let fixture: ComponentFixture<ForbiddenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbiddenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
