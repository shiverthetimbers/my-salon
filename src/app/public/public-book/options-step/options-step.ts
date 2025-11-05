import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicBook } from '../public-book';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Service, Stylist } from '@core/models/book-types';
import { AsyncPipe } from '@angular/common';
// import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-options-step',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    AsyncPipe,
    // A11yModule,
  ],
  templateUrl: './options-step.html',
  styleUrl: './options-step.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsStep {
  bookParent = inject(PublicBook);

  readonly stylists$: Observable<Stylist[]> = this.bookParent.stylists$;
  readonly services$: Observable<Service[]> = this.bookParent.services$;

  private readonly _futureDate = new Date();
  private readonly _currentDay = this._futureDate.getDate();

  readonly minDate = new Date(this._futureDate);
  readonly maxDate = new Date(this._futureDate.setDate(90 + this._currentDay));
}
