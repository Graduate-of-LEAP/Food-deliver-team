"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { api } from "@/lib/axios";

type UserMeResponse = {
  id: string;
  avatarImg: string;
  userName: string;
  email: string;
  phoneNumber: number;
  address: string;
  owog: string;
};

type AuthContextType = {
  userMe: UserMeResponse | undefined;
  setUserMe: (userMe: UserMeResponse | undefined) => void;
  LogOut: () => Promise<void>;
  getMe: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userMe, setUserMe] = useState<UserMeResponse | undefined>();
  const userId = userMe?.id || ""; // Use userMe ID

  const getMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token байхгүй байна!");
      return;
    }
    try {
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API хариу: ", response.data); // API-аас хариу зөв ирж байгаа эсэхийг шалгах
      setUserMe(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const LogOut = async () => {
    try {
      localStorage.removeItem("token");
      setUserMe(undefined);
      window.location.reload();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userMe,
        setUserMe,
        LogOut,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
