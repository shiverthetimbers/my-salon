import { Component, inject } from '@angular/core';
import { PublicBook } from '../public-book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { FirestoreBookService } from '@core/services/firestore-book-service';
import { catchError, finalize, map, Observable, of, shareReplay, tap } from 'rxjs';
import { Slot, Stylist } from '@core/models/book-types';
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

  message = '';
  slots$: Observable<Slot[]> | null = null;
  groups$: Observable<Array<{ stylistId: string; slots: Slot[] }>> | null = null;
  nameLookup$ = this.bookParent.stylists$.pipe(
    map((list) => Object.fromEntries(list.map((s) => [s.id, s.name]))),
    shareReplay(1)
  );

  private stylistNameMap$ = this.bookParent.stylists$.pipe(
    map((list: Stylist[]) => new Map<string, string>(list.map((s) => [s.id, s.name])))
  );

  stylistNameFor(id: string): Observable<string> {
    return this.stylistNameMap$.pipe(map((m) => m.get(id) ?? id));
  }

  load(): void {
    // clear selected time if step 1 is changed
    this.bookParent.secondFormGroup.controls.time.setValue(null);

    this.message = '';
    this.slots$ = null;
    this.groups$ = null;

    const serviceId = this.bookParent.firstFormGroup.get('service')?.value as string | null;
    const stylistChoice = this.bookParent.firstFormGroup.get('stylist')?.value as string | null;
    const date = this.bookParent.firstFormGroup.get('date')?.value as Date | null;

    if (!serviceId || !stylistChoice || !date) {
      this.message = 'Please complete the previous step.';
      return;
    }

    if (stylistChoice === 'any') {
      this.message = 'Loading...';
      this.groups$ = this.data.getAvailabilityForAny$(serviceId, date).pipe(
        tap((groups) => console.log('any(): groups returned =', groups.length)),
        catchError((err) => {
          console.error('any() error:', err);
          this.message = err?.message ?? 'Failed to load availability.';
          return of([]); // render "no stylists available" instead of hanging
        }),
        finalize(() => (this.message = ''))
      );
      return;
    }

    this.slots$ = this.data.getAvailabilityForStylist$(serviceId, date, stylistChoice);
  }

  selectSlot(slot: Slot): void {
    this.bookParent.secondFormGroup.controls.time.setValue(slot);
  }

  get hasPickedTime(): boolean {
    return !!this.bookParent.secondFormGroup.controls.time.value;
  }
}
