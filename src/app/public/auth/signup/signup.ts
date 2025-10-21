import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../../core/services/firebase-auth-service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private formBuilder = inject(FormBuilder);
  private authService = inject(FirebaseAuthService);
  private router = inject(Router);

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: [
      '',
      [Validators.required, Validators.pattern('^(?!^(?:.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$).+$')],
    ],
  });

  email = this.registerForm.get('email');
  username = this.registerForm.get('username');
  password = this.registerForm.get('password');
  errorMessage: string | null = null;

  // Class binding for invalid inputs
  isCurrentlyInvalid(fieldInput: AbstractControl | null): boolean {
    if (!!fieldInput && fieldInput.invalid && (fieldInput.dirty || fieldInput.touched)) {
      return true;
    } else return false;
  }

  onSubmit(): void {
    const rawForm = this.registerForm.getRawValue();
    this.authService.register(rawForm.email!, rawForm.username!, rawForm.password!).subscribe({
      next: () => {
        this.router.navigateByUrl('staff/schedule');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
