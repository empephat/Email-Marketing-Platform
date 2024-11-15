import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthContextType, AuthAction, AuthState } from "../types/authTypes";
import envMode from "@/components/helper/checkENVmode";
import { userInfo } from "os";

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: null,
  });

  // Check if the user is logged in and if so, dispatch the action.
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${envMode()}/auth/status`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          const { id, name, email, age } = data.user;
          const userInfo = { id, name, email, age };
          dispatch({ type: "LOGIN", payload: userInfo });
        }
      } catch (err) {
        console.error("Failed to check authentication status:", err);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
