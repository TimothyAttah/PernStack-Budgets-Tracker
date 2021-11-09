import { IncomeTypes } from '../types';

interface CreateIncome {
	type: IncomeTypes.CREATE_INCOME;
	payload: object;
}

interface ListIncomes {
	type: IncomeTypes.LIST_INCOMES;
	payload: object;
}
interface ListIncome {
	type: IncomeTypes.LIST_INCOME;
	payload: object;
}

interface UpdateIncome {
	type: IncomeTypes.UPDATE_INCOME;
	payload: {
		id: number | string;
		data: object;
	};
}

interface DeleteIncome {
	type: IncomeTypes.DELETE_INCOME;
	payload: number | string;
}

export type IncomeActionTypes =
	| CreateIncome
	| ListIncomes
	| ListIncome
	| UpdateIncome
	| DeleteIncome;
