import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseInitService {
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

  readonly FirebaseInit: FirebaseApp = initializeApp(this.firebaseConfig);
}
