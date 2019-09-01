import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAreYouPage } from './who-are-you.page';

describe('WhoAreYouPage', () => {
  let component: WhoAreYouPage;
  let fixture: ComponentFixture<WhoAreYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoAreYouPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoAreYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
