// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";

import {IncomeExpense} from "../../models/income-expense.model";

import {Subscription} from "rxjs";

import {IncomeExpenseServiceService} from "../../services/income-expense.service.service";

import Swal from "sweetalert2";
import {IncomeOrderPipe} from "../../pipes/income-order.pipe";
import {AppStateWithIncomeExpense} from "../income-expense.reducer";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, IncomeOrderPipe],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  incomeExpense: IncomeExpense[] = [];
  incomeExpenseSubs: Subscription;

  constructor( private store: Store<AppStateWithIncomeExpense>,
               private incomeExpenseService: IncomeExpenseServiceService) { }

  ngOnInit(): void {
    this.incomeExpenseSubs = this.store.select('incomeExpense')
      .subscribe( ({items}) => this.incomeExpense = [...items]);
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubs.unsubscribe();
  }

  deleteItem(item: any): void {

    Swal.fire({
      title: '¿Está segur@?',
      text: `El ítem ${item.description} será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
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
