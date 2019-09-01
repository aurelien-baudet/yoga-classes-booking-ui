import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpButtonComponent } from './help-button.component';

describe('HelpButtonComponent', () => {
  let component: HelpButtonComponent;
  let fixture: ComponentFixture<HelpButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpButtonComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
