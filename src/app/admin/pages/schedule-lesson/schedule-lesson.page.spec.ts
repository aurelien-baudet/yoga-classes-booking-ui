import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLessonPage } from './schedule-lesson.page';

describe('ScheduleLessonPage', () => {
  let component: ScheduleLessonPage;
  let fixture: ComponentFixture<ScheduleLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleLessonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
