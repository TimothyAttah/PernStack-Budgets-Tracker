import { ExpensesTypes } from '../types';

interface CreateExpenses {
	type: ExpensesTypes.CREATE_EXPENSES;
	payload: object;
}

interface ListExpenses {
	type: ExpensesTypes.LIST_EXPENSES;
	payload: object;
}

interface ListExpense {
	type: ExpensesTypes.LIST_EXPENSE;
	payload: object;
}

interface UpdateExpenses {
	type: ExpensesTypes.UPDATE_EXPENSES;
	payload: {
		id: number | string;
		data: object;
	};
}

interface DeleteExpenses {
	type: ExpensesTypes.DELETE_EXPENSES;
	payload: number | string;
}

export type ExpensesActionTypes =
	| CreateExpenses
	| ListExpenses
	| ListExpense
	| UpdateExpenses
	| DeleteExpenses;
