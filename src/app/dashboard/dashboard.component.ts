import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import {filter, Subscription} from "rxjs";
import {IncomeExpenseServiceService} from "../services/income-expense.service.service";
import * as incomeExpenseActions from "../income-expense/income-expense.actions";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // @ts-ignore
  userSubscription: Subscription;
  // @ts-ignore
  incomeExpenseSubscription: Subscription;

  constructor( private store: Store<AppState>, private incomeExpenseService: IncomeExpenseServiceService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
    ).subscribe( ({user}) => {
        this.incomeExpenseSubscription = this.incomeExpenseService.initIncomeExpenseListener(user.uid)
        .subscribe( incomeExpense => {
            this.store.dispatch(incomeExpenseActions.setItems({items: incomeExpense}))
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
