import { DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseInitService } from './firebase-init-service';
import { Observable, from, shareReplay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserInterface } from '../user-interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private readonly firebaseApp = inject(FirebaseInitService);
  readonly Auth: Auth = getAuth(this.firebaseApp.FirebaseInit);
  private readonly destroyRef = inject(DestroyRef);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  readonly user$: Observable<User | null> = new Observable<User | null>((subscriber) => {
    const unsubscribe = onAuthStateChanged(
      this.Auth,
      (user) => subscriber.next(user),
      (err) => subscriber.error(err)
    );
    return () => unsubscribe();
  }).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private readonly _bindUserToSignal = this.user$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((user) => {
      if (user) {
        this.currentUserSig.set({
          uid: user.uid,
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.currentUserSig.set(null);
      }
      console.log(this.currentUserSig());
    });

  isAuthenticated(): boolean {
    if (!!this.currentUserSig()) {
      return true;
    } else {
      return false;
    }
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.Auth, email, password).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.Auth, email, password).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.Auth);
    return from(promise);
  }
}
