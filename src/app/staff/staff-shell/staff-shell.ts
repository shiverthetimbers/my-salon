import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { FirebaseAuthService } from '../../core/services/firebase-auth-service';

@Component({
  selector: 'app-staff-shell',
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
  ],
  templateUrl: './staff-shell.html',
  styleUrl: './staff-shell.css',
})
export class StaffShell {
  auth = inject(FirebaseAuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
  }
}
