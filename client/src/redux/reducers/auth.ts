import { UsersTypes } from "../types";
import { AuthTypesActions } from '../actionTypes/authAction';
import { InitialUser } from "../reduxInterface";

const initialUser: InitialUser = {
	users: [],
};

export const authReducer = (state = initialUser, action: AuthTypesActions) => {
	switch (action.type) {
		case UsersTypes.SIGN_UP:
		case UsersTypes.SIGN_IN:
			return {
				...state,
				users: action.payload,
			};
		case UsersTypes.GET_USER:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};
