import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseAuthService } from '../../../core/services/firebase-auth-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private auth = inject(FirebaseAuthService);
  private router = inject(Router);

  toggleStatus = true;
  visibilityIcon = 'visibility';
  inputType = 'password';
  errorMessage: string | null = null;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  visibilityToggle(visible: boolean): void {
    this.toggleStatus = !this.toggleStatus;
    if (visible) {
      this.visibilityIcon = 'visibility';
      this.inputType = 'password';
    } else {
      this.visibilityIcon = 'visibility_off';
      this.inputType = 'text';
    }
  }

  // onSubmit(): void {
  //   const rawForm = this.loginForm.getRawValue();
  //   this.auth.login(rawForm.email!, rawForm.password!).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl('staff/schedule');
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.code;
  //     },
  //   });
  // }
}
