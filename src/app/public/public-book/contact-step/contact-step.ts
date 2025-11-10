import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PublicBook } from '../public-book';
import { MatStepperModule } from '@angular/material/stepper';

/** Simple US phone pattern (tolerates punctuation/spaces); adjust later if needed */
const US_PHONE_REGEX = /^\s*(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\s*$/;

@Component({
  selector: 'app-contact-step',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
  ],
  templateUrl: './contact-step.html',
  styleUrl: './contact-step.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactStep {
  readonly bookParent = inject(PublicBook);

  get firstName() {
    return this.bookParent.thirdFormGroup.get('firstName');
  }
  get lastName() {
    return this.bookParent.thirdFormGroup.get('lastName');
  }
  get email() {
    return this.bookParent.thirdFormGroup.get('email');
  }
  get phone() {
    return this.bookParent.thirdFormGroup.get('phone');
  }

  markAllTouched(): void {
    this.bookParent.thirdFormGroup.markAllAsTouched();
  }

  validatePhoneIfPresent(): void {
    const ctrl = this.phone!;
    const v = (ctrl.value ?? '').toString().trim();
    if (!v) {
      ctrl.setErrors(null);
      return;
    }
    ctrl.setErrors(US_PHONE_REGEX.test(v) ? null : { phoneInvalid: true });
  }
}
