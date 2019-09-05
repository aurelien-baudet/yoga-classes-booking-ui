import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledLessonCardComponent } from './unscheduled-lesson-card.component';

describe('UnscheduledLessonCardComponent', () => {
  let component: UnscheduledLessonCardComponent;
  let fixture: ComponentFixture<UnscheduledLessonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledLessonCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledLessonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
