import {Routes} from "@angular/router";

export const DashboardRouting: Routes = [
  {
    path: '',
    loadComponent: () => import('../income-expense/stadistic/stadistic.component').then( mod => mod.StadisticComponent)
  },
  {
    path: 'income-expense',
    loadComponent: () => import('../income-expense/income-expense.component').then( mod => mod.IncomeExpenseComponent)
  },
  {
    path: 'detail',
    loadComponent: () => import('../income-expense/detail/detail.component').then( mod => mod.DetailComponent)
  }
];
