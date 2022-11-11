import {createAction, props} from "@ngrx/store";
import {IncomeExpense} from "../models/income-expense.model";

export const setItems = createAction( '[Income Expense] UnSet Items',
  props<{ items: IncomeExpense[] }>()
);
export const unSetItems = createAction( '[Income Expense] Set Items');
