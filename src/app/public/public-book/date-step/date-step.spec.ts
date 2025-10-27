import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateStep } from './date-step';

describe('DateStep', () => {
  let component: DateStep;
  let fixture: ComponentFixture<DateStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
