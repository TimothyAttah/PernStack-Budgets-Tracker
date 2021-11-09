import { combineReducers } from 'redux';
import { Incomes, Expenses } from '../reduxInterface';

import { incomes } from './income';
import { expenses } from './expenses';

export interface StoreState {
  incomes: Incomes;
  expenses: Expenses;
}

export const reducers = combineReducers({
  incomes,
  expenses
});
