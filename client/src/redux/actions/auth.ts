import { toast } from "react-toastify";
import { Dispatch } from "redux";

import * as api from '../api';
import { UsersTypes } from "../types";
import { AuthTypesActions } from "../actionTypes/authAction";
import { ISigninUser, IUser } from "../reduxInterface";
import history from "../../history";

export const signUpUser = (userData: IUser) => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.signUpUser(userData);
		dispatch<AuthTypesActions>({
			type: UsersTypes.SIGN_UP,
			payload: data.users,
		});
		history.push('/users/signin');
		toast.success(data.message);
	} catch (err:any) {
		if (err.response && err.response.data) {
			return toast.error(err.response.data.error);
		}
		console.log(err);
	}
};

export const signInUser =
	(userData: ISigninUser) => async (dispatch: Dispatch) => {
		try {
			const { data } = await api.signInUser(userData);
			dispatch<AuthTypesActions>({
				type: UsersTypes.SIGN_IN,
				payload: data.results,
			});
			localStorage.setItem('jwt', data.token);
			localStorage.setItem('user', JSON.stringify(data.results));
			history.push('/');
			window.location.reload()
			toast.success(data.message);
		} catch (err:any) {
			if (err.response && err.response.data) {
				return toast.error(err.response.data.error);
			}
			console.log(err);
		}
  };

  export const getUsers = () => async (dispatch: Dispatch) => {
		try {
			const { data } = await api.getUsers();
			console.log(' auth data', data);
			dispatch<AuthTypesActions>({
				type: UsersTypes.GET_USER,
				payload: data.savedUsers,
			});
		} catch (err) {
			console.log(err);
		}
	};
