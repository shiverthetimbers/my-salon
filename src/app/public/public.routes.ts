import { Routes } from '@angular/router';
import { PublicLanding } from './public-landing/public-landing';
import { PublicServices } from './public-services/public-services';
import { PublicBook } from './public-book/public-book';

export const public_routes: Routes = [
  { path: '', component: PublicLanding },
  { path: 'services', component: PublicServices },
  { path: 'book', component: PublicBook },
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
  },
  {
    path: 'auth/signup',
    loadComponent: () => import('./auth/signup/signup').then((m) => m.Signup),
  },
];
