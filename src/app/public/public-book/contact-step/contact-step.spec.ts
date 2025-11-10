import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStep } from './contact-step';

describe('ContactStep', () => {
  let component: ContactStep;
  let fixture: ComponentFixture<ContactStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
