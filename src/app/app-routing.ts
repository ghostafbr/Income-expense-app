import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {importProvidersFrom} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {incomeExpenseReducer} from "./income-expense/income-expense.reducer";

  export const AppRouting: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent)
    },
    {
      path: 'register',
      loadComponent: () => import('./auth/register/register.component').then(mod => mod.RegisterComponent)
    },
    {
      path: '',
      canLoad: [AuthGuard],
      loadComponent: () => import('./dashboard/dashboard.component').then(mod => mod.DashboardComponent),
      loadChildren: () => import('./dashboard/dashboard.routing').then(mod => mod.DashboardRouting),
      providers: [
        importProvidersFrom(
          StoreModule.forFeature('incomeExpense', incomeExpenseReducer)
        ),
      ],
    },
    {path: '**', redirectTo: '' },
  ];

