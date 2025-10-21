import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth-service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(FirebaseAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('auth/login');
    alert('You need to log in to access that page.');
    return false;
  }
};
