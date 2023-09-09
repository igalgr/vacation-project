import { User } from "../models/User";

export interface AuthState {
  user: User | null;
  token: string | null;
  level: number;
}

export enum AuthActionType {
  setLogin = "setLogin",
  setLogout = "setLogout",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export const setLoginAction = (user: User, token: string): AuthAction => {
  return { type: AuthActionType.setLogin, payload: { user, token } };
};

export const setLogoutAction = (): AuthAction => {
  return { type: AuthActionType.setLogout };
};

export const authReducer = (
  currentState: AuthState = { user: null, token: null, level: 0 },
  action: AuthAction
): AuthState => {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.setLogin:
      newState.user = action.payload.user;
      newState.token = action.payload.token;
      break;

    case AuthActionType.setLogout:
      newState.user = null;
      newState.token = null;
      break;

    default:
      return currentState;
  }
  return newState;
};