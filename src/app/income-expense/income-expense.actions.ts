import {createAction, props} from "@ngrx/store";
import {IncomeExpense} from "../models/income-expense.model";

export const unSetItems = createAction('[IncomeExpense] UnSet Items');

export const setItems = createAction(
  '[IncomeExpense] Set Items',
  props<{ items: IncomeExpense[] }>()
);
