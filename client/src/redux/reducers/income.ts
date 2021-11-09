import { IncomeTypes } from "../types";
import { IncomeActionTypes } from "../actionTypes/incomeAction";
import { Incomes } from "../reduxInterface";

const initialState: Incomes = {
  incomes: []
}

export const incomes = (state = initialState, action: IncomeActionTypes) => {
  switch (action.type) {
    case IncomeTypes.CREATE_INCOME:
      return {
        ...state,
        incomes: [action.payload, ...state.incomes]
      }
    case IncomeTypes.LIST_INCOMES:
    case IncomeTypes.LIST_INCOME:
      return {
        ...state,
        incomes: action.payload
      }
    case IncomeTypes.UPDATE_INCOME:
      return {
        ...state,
        incomes: state.incomes.map(income => income.incomes_id === action.payload.id ? action.payload : income)
      }
    case IncomeTypes.DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(income => income.incomes_id !== action.payload)
      }
    default:
      return state;
  };
};
