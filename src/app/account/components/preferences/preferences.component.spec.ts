import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesComponent } from './preferences.component';

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
