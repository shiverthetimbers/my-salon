import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import type { StepperOrientation } from '@angular/material/stepper';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OptionsStep } from './options-step/options-step';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectStep } from './select-step/select-step';

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
    SelectStep,
  ],
  templateUrl: './public-book.html',
  styleUrl: './public-book.css',
})
export class PublicBook {
  formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);

  // Change breakpoint as you like (e.g., Breakpoints.Medium, custom query, etc.)
  private handset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((r) => r.matches));

  readonly isHandset = toSignal(this.handset$, { initialValue: false });

  readonly stepperOrientation = computed<StepperOrientation>(() =>
    this.isHandset() ? 'vertical' : 'horizontal'
  );

  firstFormGroup = this.formBuilder.group({
    service: ['', Validators.required],
    stylist: ['', Validators.required],
    date: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    time: this.formBuilder.control('', { validators: Validators.required }),
  });
}
