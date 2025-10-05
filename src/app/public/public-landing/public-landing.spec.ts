import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLanding } from './public-landing';

describe('PublicLanding', () => {
  let component: PublicLanding;
  let fixture: ComponentFixture<PublicLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
