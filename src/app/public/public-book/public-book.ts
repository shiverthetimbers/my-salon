import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OptionsStep } from './options-step/options-step';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateStep } from './date-step/date-step';

@Component({
  selector: 'app-public-book',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    OptionsStep,
    MatFormFieldModule,
    OptionsStep,
    DateStep,
  ],
  templateUrl: './public-book.html',
  styleUrl: './public-book.css',
})
export class PublicBook {
  formBuilder = inject(FormBuilder);

  firstFormGroup = this.formBuilder.group({
    service: ['', Validators.required],
    stylist: ['', Validators.required],
    date: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    date: [],
    time: [],
    stylist: [],
  });
}
