import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicShell } from './public-shell';

describe('PublicShell', () => {
  let component: PublicShell;
  let fixture: ComponentFixture<PublicShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
