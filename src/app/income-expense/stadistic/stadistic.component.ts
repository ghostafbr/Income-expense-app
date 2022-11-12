// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {IncomeExpense} from "../../models/income-expense.model";
import {NgChartsModule} from "ng2-charts";
import {AppStateWithIncomeExpense} from "../income-expense.reducer";

@Component({
  selector: 'app-stadistic',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css']
})
export class StadisticComponent implements OnInit {

  income: number = 0;
  expense: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  public doughnutData;

  constructor( private store: Store<AppStateWithIncomeExpense>) { }

  ngOnInit(): void {

    this.store.select('incomeExpense').subscribe(({items}) => {
      this.generateStadistic(items);
    });
  }

  generateStadistic( items: IncomeExpense[] ) {

    this.income = 0;
    this.expense = 0;
    this.totalIncome = 0;
    this.totalExpenses = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.amount;
        this.income++;
      } else {
        this.totalExpenses += item.amount;
        this.expense ++;
      }
    }
    this.initChart();
  }

  initChart() {
    this.doughnutData = {
      labels: ['Ingresos', 'Egresos'],
      datasets: [{
        label: 'My First Dataset',
        data: [ this.totalIncome, this.totalExpenses ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  }

}
