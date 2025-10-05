import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffShell } from './staff-shell';

describe('StaffShell', () => {
  let component: StaffShell;
  let fixture: ComponentFixture<StaffShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
