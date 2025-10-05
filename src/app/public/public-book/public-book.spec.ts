import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBook } from './public-book';

describe('PublicBook', () => {
  let component: PublicBook;
  let fixture: ComponentFixture<PublicBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
