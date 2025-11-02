import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStep } from './select-step';

describe('SelectStep', () => {
  let component: SelectStep;
  let fixture: ComponentFixture<SelectStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
