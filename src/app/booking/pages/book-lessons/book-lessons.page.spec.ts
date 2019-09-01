import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLessonsPage } from './book-lessons.page';

describe('BookLessonsPage', () => {
  let component: BookLessonsPage;
  let fixture: ComponentFixture<BookLessonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLessonsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
