import { Component, inject } from '@angular/core';
import { PublicBook } from '../public-book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';

import { Stylist } from '@core/models/booking/stylist';

interface Time {
  slot: string;
}

interface TimeGroups {
  name: string;
  times: Time[];
}

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
  ],
  templateUrl: './select-step.html',
  styleUrl: './select-step.css',
})
export class SelectStep {
  bookParent = inject(PublicBook);
  stylists: Stylist[] = [
    { id: 'abc', name: 'Eli' },
    { id: 'def', name: 'Jordan' },
    { id: 'ghi', name: 'Marcus' },
  ];

  readonly timeGroups: TimeGroups[] = [
    {
      name: 'morning',
      times: [
        { slot: '9:00am' },
        { slot: '9:30am' },
        { slot: '10:00am' },
        { slot: '10:30am' },
        { slot: '11:00am' },
        { slot: '11:30am' },
      ],
    },
    {
      name: 'afternoon',
      times: [
        { slot: '12:00pm' },
        { slot: '12:30pm' },
        { slot: '1:00pm' },
        { slot: '1:30pm' },
        { slot: '2:00pm' },
        { slot: '2:30pm' },
        { slot: '3:00pm' },
        { slot: '3:30pm' },
        { slot: '4:00pm' },
        { slot: '4:30pm' },
      ],
    },
    {
      name: 'evening',
      times: [
        { slot: '5:00pm' },
        { slot: '5:30pm' },
        { slot: '6:00pm' },
        { slot: '6:30pm' },
        { slot: '7:00pm' },
        { slot: '7:30pm' },
      ],
    },
  ];

  onClick() {
    console.log(this.bookParent.secondFormGroup.value);
  }
}
