import { Dispatch } from "react";



export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number | null;
}
export type AuthAction =
  | {
    type: "LOGIN";
    payload: User;
  }
  | {
    type: "LOGOUT"

  };
