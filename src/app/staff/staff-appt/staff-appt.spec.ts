import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAppt } from './staff-appt';

describe('StaffAppt', () => {
  let component: StaffAppt;
  let fixture: ComponentFixture<StaffAppt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAppt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAppt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
