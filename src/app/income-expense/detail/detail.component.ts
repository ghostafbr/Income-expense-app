import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {IncomeExpense} from "../../models/income-expense.model";
import {Subscription} from "rxjs";
import {IncomeExpenseServiceService} from "../../services/income-expense.service.service";
import Swal from "sweetalert2";
import {IncomeOrderPipe} from "../../pipes/income-order.pipe";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, IncomeOrderPipe],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  // @ts-ignore
  incomeExpenseSubs: Subscription;
  incomeExpense: IncomeExpense[] = [];

  constructor( private store: Store<AppState>, private incomeExpenseService: IncomeExpenseServiceService) { }

  ngOnInit(): void {
    this.incomeExpenseSubs = this.store.select('incomeExpense')
      .subscribe( ({items}) => this.incomeExpense = [...items]);
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubs.unsubscribe();
  }

  deleteItem(item: any): void {

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${item.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incomeExpenseService.deleteIncomeExpense(item.uid).then( () => {
          Swal.fire('Deleted', item.description, 'success');
        }).catch( error => {
          Swal.fire('Error', error.message, 'error');
        });
      }
    })
  };
}
