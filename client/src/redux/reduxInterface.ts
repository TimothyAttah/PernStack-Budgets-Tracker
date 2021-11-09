export interface IUser {
	user_id?: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export interface ISigninUser {
	user_id?: string;
	email: string;
	password: string;
}

export type InitialUser = {
	users: IUser[];
};

interface IncomeLists {
	incomes_id: number | string;
	user_id: string;
	content: string;
	value: number;
	created_At?: Date | string;
}

export type Incomes = {
	incomes: IncomeLists[];
};

interface ExpensesLists {
	expenses_id: number | string;
	user_id: string;
	content: string;
	value: number;
	created_At?: Date | string;
}

export type Expenses = {
	expenses: ExpensesLists[];
};
