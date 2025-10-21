import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './core/firebase-service';
import { UserInterface } from './core/user-interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-salon');

  firebase = inject(FirebaseService);
  user$ = this.firebase.auth.currentUser;
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
}
