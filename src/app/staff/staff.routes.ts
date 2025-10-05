import { Routes } from '@angular/router';
import { StaffSchedule } from './staff-schedule/staff-schedule';
import { StaffAppt } from './staff-appt/staff-appt';
import { StaffProfile } from './staff-profile/staff-profile';

export const staff_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' },
  { path: 'schedule', component: StaffSchedule },
  { path: 'appt', component: StaffAppt},
  { path: 'profile', component: StaffProfile}
];
