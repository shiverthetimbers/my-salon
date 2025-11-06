import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmStep } from './confirm-step';

describe('ConfirmStep', () => {
  let component: ConfirmStep;
  let fixture: ComponentFixture<ConfirmStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
