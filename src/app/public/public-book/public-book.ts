import { Component, computed, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import type { StepperOrientation } from '@angular/material/stepper';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OptionsStep } from './options-step/options-step';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FirestoreBookService } from '@core/services/firestore-book-service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectStep } from './select-step/select-step';
import { Slot } from '@core/models/book-types';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ConfirmStep } from './confirm-step/confirm-step';

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
    ConfirmStep,
  ],
  templateUrl: './public-book.html',
  styleUrl: './public-book.css',
})
export class PublicBook {
  formBuilder = inject(FormBuilder);
  data = inject(FirestoreBookService);
  private breakpointObserver = inject(BreakpointObserver);

  // Change breakpoint as you like (e.g., Breakpoints.Medium, custom query, etc.)
  private handset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((r) => r.matches));

  readonly isHandset = toSignal(this.handset$, { initialValue: false });

  readonly stepperOrientation = computed<StepperOrientation>(() =>
    this.isHandset() ? 'vertical' : 'horizontal'
  );

  // Live Data for selectors
  readonly services$ = this.data.getServices$();
  readonly stylists$ = this.data.getActiveStylists$();

  firstFormGroup = this.formBuilder.group({
    service: ['', Validators.required],
    stylist: ['', Validators.required],
    date: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    time: this.formBuilder.control<Slot | null>(null, { validators: Validators.required }),
  });

  @ViewChild(SelectStep) private selectStep?: SelectStep;

  onStepChange(evt: StepperSelectionEvent) {
    if (evt.selectedIndex === 1) {
      this.selectStep?.load();
    }
  }
}
