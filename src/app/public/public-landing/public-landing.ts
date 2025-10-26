import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-public-landing',
  imports: [NgOptimizedImage, MatCardModule, MatButtonModule, RouterLink, MatDividerModule],
  templateUrl: './public-landing.html',
  styleUrl: './public-landing.css',
})
export class PublicLanding {}
