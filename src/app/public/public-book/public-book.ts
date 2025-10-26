import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-public-book',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatStepperModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './public-book.html',
  styleUrl: './public-book.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicBook {
  private _formBuilder = inject(FormBuilder);
  private readonly _futureDate = new Date();
  private readonly _currentDay = this._futureDate.getDate();

  readonly minDate = new Date(this._futureDate);
  readonly maxDate = new Date(this._futureDate.setDate(90 + this._currentDay));

  test() {
    console.log(this.minDate);
    console.log(this.maxDate);
  }

  firstFormGroup = this._formBuilder.group({
    date: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
}
