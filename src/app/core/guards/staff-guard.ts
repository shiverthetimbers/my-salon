import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth-service';

export const staffGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(FirebaseAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('auth/login');
    return false;
  }
};
