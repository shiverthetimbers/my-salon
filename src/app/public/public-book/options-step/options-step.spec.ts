import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsStep } from './options-step';

describe('DateStep', () => {
  let component: OptionsStep;
  let fixture: ComponentFixture<OptionsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsStep],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
