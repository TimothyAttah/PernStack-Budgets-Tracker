import { Dispatch } from "redux";
import { toast } from "react-toastify";
import * as api from '../api'
import { IncomeActionTypes } from "../actionTypes/incomeAction";
import { IncomeTypes } from "../types";

export const createIncome =
	(incomes: object) => async (dispatch: Dispatch) => {
		try {
			const { data } = await api.createIncomes(incomes);
			dispatch<IncomeActionTypes>({
				type: IncomeTypes.CREATE_INCOME,
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
  
export const listIncomes = () => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.listsIncomes();		
		dispatch<IncomeActionTypes>({
			type: IncomeTypes.LIST_INCOMES,
			payload: data.incomes,
		});
	} catch (err:any) {
		if (err.response && err.response.data) {
			return toast.error(err.response.data.error);
		}
		console.log(err);
	}
};

export const listIncome = (id: object) => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.listsIncome(id);
		dispatch<IncomeActionTypes>({
			type: IncomeTypes.LIST_INCOME,
			payload: data
		});
	} catch (err:any) {
		if (err.response && err.response.data) {
			return toast.error(err.response.data.error);
		}
		console.log(err);
	}
};

export const editIncome =
	(id: string, incomes: object) => async (dispatch: Dispatch) => {
		try {
			const { data } = await api.editIncomes(id, incomes);
			dispatch<IncomeActionTypes>({
				type: IncomeTypes.UPDATE_INCOME,
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
  
export const deleteIncome = (id: string | number) => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.deleteIncomes(id);
		dispatch<IncomeActionTypes>({
			type: IncomeTypes.DELETE_INCOME,
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
