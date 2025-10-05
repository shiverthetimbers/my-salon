import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-shell',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './public-shell.html',
  styleUrl: './public-shell.css'
})
export class PublicShell {

}
