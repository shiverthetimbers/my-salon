import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public/public-shell/public-shell').then((m) => m.PublicShell),
    loadChildren: () => import('./public/public.routes').then((m) => m.public_routes),
  },
  {
    path: 'staff',
    loadComponent: () => import('./staff/staff-shell/staff-shell').then((m) => m.StaffShell),
    loadChildren: () => import('./staff/staff.routes').then((m) => m.staff_routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found').then((m) => m.NotFound),
  },
];
