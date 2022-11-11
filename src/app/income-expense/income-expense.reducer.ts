import {IncomeExpense} from "../models/income-expense.model";
import {createReducer, on} from "@ngrx/store";
import {setItems, unSetItems} from "./income-expense.actions";

export interface State {
  items: IncomeExpense[];
}

const initialState: State = {
  items: [],
}

export const _incomeExpenseReducer = createReducer(initialState,
  on( setItems, (state, {items}) => ({ ...state, items: [...items] })),
  on( unSetItems, state  => ({ ...state, items: [] })),
);

// @ts-ignore
export function incomeExpenseReducer(state, action) {
  return _incomeExpenseReducer(state, action);
}
