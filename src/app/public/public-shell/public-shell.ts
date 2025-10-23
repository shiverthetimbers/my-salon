import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FirebaseAuthService } from '../../core/services/firebase-auth-service';

@Component({
  selector: 'app-public-shell',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './public-shell.html',
  styleUrl: './public-shell.css',
})
export class PublicShell {
  auth = inject(FirebaseAuthService);

  login() {
    this.auth.login();
  }
}
