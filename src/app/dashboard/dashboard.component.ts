// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

import {NavbarComponent} from "../shared/navbar/navbar.component";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";
import {FooterComponent} from "../shared/footer/footer.component";

import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import * as incomeExpenseActions from "../income-expense/income-expense.actions";

import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';

import {IncomeExpenseServiceService} from "../services/income-expense.service.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  incomeExpenseSubscription: Subscription;

  constructor( private store: Store<AppState>,
               private incomeExpenseService: IncomeExpenseServiceService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => {
        this.incomeExpenseSubscription = this.incomeExpenseService.initIncomeExpenseListener(user.uid)
        .subscribe( incomeExpense => {
            this.store.dispatch(incomeExpenseActions.setItems({items: incomeExpense}))
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
