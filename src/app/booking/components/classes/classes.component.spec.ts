import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesComponent } from './classes.component';

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
