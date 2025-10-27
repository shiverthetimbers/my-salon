import { Component, inject } from '@angular/core';
import { PublicBook } from '../public-book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-date-step',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
  ],
  templateUrl: './date-step.html',
  styleUrl: './date-step.css',
})
export class DateStep {
  bookParent = inject(PublicBook);
}
