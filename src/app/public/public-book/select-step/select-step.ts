import { Component, inject } from '@angular/core';
import { PublicBook } from '../public-book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { FirestoreBookService } from '@core/services/firestore-book-service';
import { Observable, of } from 'rxjs';
import { Slot } from '@core/models/book-types';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-select-step',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatCardModule,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './select-step.html',
  styleUrl: './select-step.css',
})
export class SelectStep {
  bookParent = inject(PublicBook);
  private readonly data = inject(FirestoreBookService);

  slots$: Observable<Slot[]> | null = null;
  message = '';

  load(): void {
    this.message = '';
    this.slots$ = null;

    const serviceId = this.bookParent.firstFormGroup.get('service')?.value as string | null;
    const stylistChoice = this.bookParent.firstFormGroup.get('stylist')?.value as string | null;
    const date = this.bookParent.firstFormGroup.get('date')?.value as Date | null;

    if (!serviceId || !stylistChoice || !date) {
      this.message = 'Please complete the previous step.';
      return;
    }

    if (stylistChoice === 'any') {
      this.message = '"any" mode preview comming soon.';
      this.slots$ = of([]);
      return;
    }

    this.slots$ = this.data.getAvailabilityForStylist$(serviceId, date, stylistChoice);
  }

  selectSlot(slot: Slot): void {
    this.bookParent.secondFormGroup.get('time')?.setValue(slot);
  }

  get hasPickedTime(): boolean {
    return !!this.bookParent.secondFormGroup.get('time')?.value;
  }

  get slots(): Observable<Slot[]> | null {
    return this.slots$;
  }

  onClick() {
    console.log(this.bookParent.secondFormGroup.value);
  }
}
