import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicBook } from '../public-book';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

interface Service {
  id: string;
  name: string;
  price: string;
}

interface ServiceGroup {
  name: string;
  services: Service[];
}

interface Stylist {
  id: string;
  name: string;
}

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
  ],
  templateUrl: './options-step.html',
  styleUrl: './options-step.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsStep {
  readonly bookParent = inject(PublicBook);
  readonly stylists: Stylist[] = [
    { id: '123', name: 'First-available' },
    { id: 'abc', name: 'Eli' },
    { id: 'def', name: 'Jordan' },
    { id: 'ghi', name: 'Marcus' },
  ];
  readonly serviceGroups: ServiceGroup[] = [
    {
      name: '-- Haircuts --',
      services: [
        { id: 'abc', name: 'Short Cut', price: '$22' },
        { id: 'def', name: 'Long Cut', price: '$32' },
        { id: 'ghi', name: 'Kids Cut - 12 & under', price: '$12' },
        { id: 'jkl', name: 'Buzz Cut', price: '$15' },
        { id: 'mno', name: 'Head Shave', price: '$25' },
        { id: 'pqr', name: 'Wash, and Dry', price: '$15' },
      ],
    },
    {
      name: '-- Facial Hair --',
      services: [
        { id: 'mno', name: 'Beard Trim', price: '$15' },
        { id: 'pqr', name: 'Straight Edge Shave', price: '$20' },
      ],
    },
  ];
  private readonly _futureDate = new Date();
  private readonly _currentDay = this._futureDate.getDate();

  readonly minDate = new Date(this._futureDate);
  readonly maxDate = new Date(this._futureDate.setDate(90 + this._currentDay));
}
