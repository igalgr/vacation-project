import { Vacation } from "../models/Vacation";

export interface vacationState {
  vacations: Vacation[];
}

export enum VacationActionType {
  getVacations = "getVacations",
  addVacation = "addVacation",
  deleteVacation = "deleteVacation",
  updateVacation = "updateVacation",
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export const getVacationsAction = (vacations: Vacation[]): VacationAction => {
  return {
    type: VacationActionType.getVacations,
    payload: vacations,
  };
};

export const addVacationAction = (vacation: Vacation): VacationAction => {
  return {
    type: VacationActionType.addVacation,
    payload: vacation,
  };
};

export const deleteVacationAction = (id: number): VacationAction => {
  return {
    type: VacationActionType.deleteVacation,
    payload: id,
  };
};

export const updateVacationAction = (vacation: Vacation): VacationAction => {
  return {
    type: VacationActionType.updateVacation,
    payload: vacation,
  };
};

export const vacationReducer = (
  currentState: vacationState = { vacations: [] },
  action: VacationAction
): vacationState => {
  const newState = { ...currentState };
  switch (action.type) {
    case VacationActionType.getVacations:
      newState.vacations = action.payload;
      break;
    case VacationActionType.addVacation:
      newState.vacations = [...newState.vacations, action.payload];
      break;
    case VacationActionType.deleteVacation:
      newState.vacations = newState.vacations.filter(
        (v) => v.id !== action.payload
      );
      break;
    case VacationActionType.updateVacation:
      newState.vacations = newState.vacations.map((v) =>
        v.id === action.payload.id ? action.payload : v
      );

      break;
  }
  return newState;
};