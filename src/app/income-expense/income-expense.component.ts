// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IncomeExpense} from "../models/income-expense.model";
import {IncomeExpenseServiceService} from "../services/income-expense.service.service";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as ui from "../shared/ui.actions";

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {
  incomeForm: FormGroup;
  type: string = 'income';
  isLoading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeExpenseService: IncomeExpenseServiceService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
      .subscribe( ({ isLoading }) => this.isLoading = isLoading );
    this.initForm();
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  initForm() {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required ],
      amount: ['', Validators.required ]
    });
  }

  save() {
    if (this.incomeForm.invalid) {
      return;
    }
    this.store.dispatch( ui.isLoading() );

    const { description, amount } = this.incomeForm.value;
    const incomeExpense = new IncomeExpense( description, amount, this.type );

    this.incomeExpenseService.createIncomeExpense( incomeExpense )
      .then( () => {
        this.incomeForm.reset();
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Registro creado', description, 'success');
      }).catch( (err) => {
        this.store.dispatch( ui.stopLoading() );
      Swal.fire('Error', err.message, 'error');
    });
  }
}
