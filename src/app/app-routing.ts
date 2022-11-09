import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

  export const AppRouting: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent)
    },
    {
      path: 'register',
      loadComponent: () => import('./auth/register/register.component').then(mod => mod.RegisterComponent)
    },
    {path: '', component: DashboardComponent, children: [
        {
          path: '',
          loadChildren: () => import('./dashboard/dashboard.routing').then(mod => mod.DashboardRouting)
        }
      ]},
    {path: '**', redirectTo: '' },
  ];

