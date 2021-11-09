import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

import { ExpensesActionTypes } from '../actionTypes/expensesAction';
import { ExpensesTypes } from '../types';
import * as api from '../api';

export const createExpenses =
	(expenses: object) => async (dispatch: Dispatch) => {
		try {
			const { data } = await api.createExpenses(expenses);
			dispatch<ExpensesActionTypes>({
				type: ExpensesTypes.CREATE_EXPENSES,
				payload: data.results,
			});
			toast.success(data.message);
		} catch (err:any) {
			if (err.response && err.response.data) {
				return toast.error(err.response.data.error);
			}
			console.log(err);
		}
	};

export const listExpenses = () => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.listsExpenses();
		dispatch<ExpensesActionTypes>({
			type: ExpensesTypes.LIST_EXPENSES,
			payload: data.expenses,
		});
	} catch (err:any) {
		if (err.response && err.response.data) {
			return toast.error(err.response.data.error);
		}
		console.log(err);
	}
};

export const listsExpense = (id: object) => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.listsExpense(id);
		dispatch<ExpensesActionTypes>({
			type: ExpensesTypes.LIST_EXPENSE,
			payload: data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const editExpenses =
	(id: string, expenses: object) => async (dispatch: Dispatch) => {
		try {
			const { data } = await api.editExpenses(id, expenses);
			dispatch<ExpensesActionTypes>({
				type: ExpensesTypes.UPDATE_EXPENSES,
				payload: data.results,
			});
			toast.success(data.message);
		} catch (err:any) {
			if (err.response && err.response.data) {
				return toast.error(err.response.data.error);
			}
			console.log(err);
		}
	};

export const deleteExpenses = (id: string | number) => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.deleteExpenses(id);
		dispatch<ExpensesActionTypes>({
			type: ExpensesTypes.DELETE_EXPENSES,
			payload: id,
		});
		toast.success(data.message);
	} catch (err:any) {
		if (err.response && err.response.data) {
			return toast.error(err.response.data.error);
		}
		console.log(err);
	}
};
