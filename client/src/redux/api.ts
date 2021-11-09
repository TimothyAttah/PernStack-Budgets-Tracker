import axios from 'axios';
import { ISigninUser } from '../redux/reduxInterface';

const baseURL = 'http://localhost:5000/api/v1';

const API = axios.create({ baseURL: baseURL });

API.interceptors.request.use(req => {
	if (localStorage.getItem('jwt')) {
		req.headers['Authorization'] = localStorage.getItem('jwt');
	}
	return req;
});

// User
export const signUpUser = (userData: object) =>
	API.post('/auth/signup', userData);

export const signInUser = (userData: ISigninUser) =>
	API.post('/auth/signin', userData);

export const getUsers = () => API.get('/auth');

// Incomes
export const listsIncomes = () => API.get('/incomes');

export const listsIncome = (id: object) => API.get(`/incomes/${id}`);

export const createIncomes = (incomes: object) =>
	API.post('/incomes/create', incomes);

export const editIncomes = (id: string, incomes: object) =>
	API.put(`/incomes/${id}/update`, incomes);

export const deleteIncomes = (id: string | number) =>
	API.delete(`/incomes/${id}/delete`);

	
// Expenses
export const listsExpenses = () => API.get('/expenses');

export const listsExpense = (id: object) => API.get(`/expenses/${id}`);

export const createExpenses = (expenses: object) =>
	API.post('/expenses/create', expenses);

export const editExpenses = (id: string, expenses: object) =>
	API.put(`/expenses/${id}/update`, expenses);

export const deleteExpenses = (id: string | number) =>
	API.delete(`/expenses/${id}/delete`);
