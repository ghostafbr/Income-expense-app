import {Routes} from "@angular/router";
import {AuthGuard} from "../services/auth.guard";
import {importProvidersFrom} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {incomeExpenseReducer} from "../income-expense/income-expense.reducer";

export const DashboardRouting: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('../income-expense/stadistic/stadistic.component').then( mod => mod.StadisticComponent)
  },
  {
    path: 'income-expense',
    canActivate: [AuthGuard],
    loadComponent: () => import('../income-expense/income-expense.component').then( mod => mod.IncomeExpenseComponent)
  },
  {
    path: 'detail',
    canActivate: [AuthGuard],
    loadComponent: () => import('../income-expense/detail/detail.component').then( mod => mod.DetailComponent)
  }

];
