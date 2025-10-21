import { inject, Injectable, signal } from '@angular/core';
import { type FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import { Observable, from, shareReplay } from 'rxjs';
import { UserInterface } from './user-interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // Firebase configuration
  private readonly firebaseConfig = {
    apiKey: 'AIzaSyAgcdIZ26mx_idWyyV_HQZo9w4vCOqce3o',
    authDomain: 'my-salon-9b775.firebaseapp.com',
    projectId: 'my-salon-9b775',
    storageBucket: 'my-salon-9b775.firebasestorage.app',
    messagingSenderId: '470564201529',
    appId: '1:470564201529:web:a6cefa40d63d85c96d99e8',
    measurementId: 'G-5TMST1DB6P',
  };

  readonly app: FirebaseApp;
  readonly auth: Auth;
  readonly user$: Observable<User | null>;
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  // Initialize Firebase
  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);

    this.user$ = new Observable<User | null>((subscriber) => {
      const unsub = onAuthStateChanged(
        this.auth,
        (user) => subscriber.next(user),
        (err) => subscriber.error(err)
      );
      return unsub;
    }).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    this.user$.subscribe((u) => {
      this.currentUserSig.set(u ? { uid: u.uid, email: u.email, username: u.displayName } : null);
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const regPromise = createUserWithEmailAndPassword(this.auth, email, password).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(regPromise);
  }

  login(email: string, password: string): Observable<void> {
    const logPromise = signInWithEmailAndPassword(this.auth, email, password).then(() => {});
    return from(logPromise);
  }

  logout(): Observable<void> {
    const outPromise = signOut(this.auth).then(() => {});
    return from(outPromise);
  }
}
