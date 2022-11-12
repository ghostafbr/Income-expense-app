// @ts-nocheck
import {IncomeExpense} from "../models/income-expense.model";
import {createReducer, on} from "@ngrx/store";
import {setItems, unSetItems} from "./income-expense.actions";
import {AppState} from "../app.reducer";

export interface State {
  items: IncomeExpense[];
}

export interface AppStateWithIncomeExpense extends AppState {
  incomeExpense: State;
}

const initialState: State = {
  items: [],
}

export const _incomeExpenseReducer = createReducer(initialState,
  on( setItems, (state, {items}) => ({ ...state, items: [...items] })),
  on( unSetItems, state  => ({ ...state, items: [] })),
);

export function incomeExpenseReducer(state, action) {
  return _incomeExpenseReducer(state, action);
}
