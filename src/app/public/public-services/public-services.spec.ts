import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServices } from './public-services';

describe('PublicServices', () => {
  let component: PublicServices;
  let fixture: ComponentFixture<PublicServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
