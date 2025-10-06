import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';


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
    MatButtonToggleModule,
    MatListModule
  ],
  templateUrl: './public-shell.html',
  styleUrl: './public-shell.css'
})
export class PublicShell {

}
