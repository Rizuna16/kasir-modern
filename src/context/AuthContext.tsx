import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

import type { User } from "../types/user";

import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
} from "../services/authService";

interface AuthContextType {
  user: User | null;

  login: (username: string, password: string) => boolean;

  logout: () => void;

  isLogin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();

    setUser(currentUser);
  }, []);

  const login = (username: string, password: string): boolean => {
    const result = loginService(username, password);

    if (!result) {
      return false;
    }

    setUser(result);

    return true;
  };

  const logout = () => {
    logoutService();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        login,

        logout,

        isLogin: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
