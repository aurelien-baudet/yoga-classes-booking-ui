import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredInfoFormComponent } from './unregistered-info-form.component';

describe('UnregisteredInfoFormComponent', () => {
  let component: UnregisteredInfoFormComponent;
  let fixture: ComponentFixture<UnregisteredInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisteredInfoFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
