import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSchedule } from './staff-schedule';

describe('StaffSchedule', () => {
  let component: StaffSchedule;
  let fixture: ComponentFixture<StaffSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffSchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
