import { Routes } from '@angular/router';
import { PublicLanding } from './public-landing/public-landing';
import { PublicServices } from './public-services/public-services';
import { PublicBook } from './public-book/public-book';

export const public_routes: Routes = [
  { path: '', component: PublicLanding },
  { path: 'services', component: PublicServices },
  { path: 'book', component: PublicBook}
];
