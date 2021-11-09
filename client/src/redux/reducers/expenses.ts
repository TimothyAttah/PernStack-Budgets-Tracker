import { ExpensesTypes } from '../types';
import { ExpensesActionTypes } from '../actionTypes/expensesAction';
import { Expenses } from '../reduxInterface';

const initialState: Expenses = {
	expenses: [],
};


export const expenses = (state = initialState, action: ExpensesActionTypes) => {
	switch (action.type) {
		case ExpensesTypes.CREATE_EXPENSES:
			return {
				...state,
				expenses: [action.payload, ...state.expenses],
			};
		case ExpensesTypes.LIST_EXPENSES:
			case ExpensesTypes.LIST_EXPENSE:
			return {
				...state,
				expenses: action.payload
			};
		case ExpensesTypes.UPDATE_EXPENSES:
			return {
				...state,
				expenses: state.expenses.map(expense =>
					expense.expenses_id === action.payload.id ? action.payload : expense
				),
			};
		case ExpensesTypes.DELETE_EXPENSES:
			return {
				...state,
				expenses: state.expenses.filter(expense => expense.expenses_id !== action.payload),
			};
		default:
			return state;
	}
};
