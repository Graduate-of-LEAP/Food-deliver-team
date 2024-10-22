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
  userName: string;
  email: string;
  phone: string;
  address: string;
  owog: string;
};

type AuthContextType = {
  userMe: UserMeResponse | undefined;
  setUserMe: (userMe: UserMeResponse | undefined) => void;
  LogOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

type orderDataResponse = {
  _id: string;
  productId: ProductResponse;
  userId: string;
  size: string;
  count: number;
  price: number;
}[];

type ProductResponse = {
  _id: string;
  productName: string;
  image: string[];
  price: number;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userMe, setUserMe] = useState<UserMeResponse | undefined>();
  const userId = userMe?.id || ""; // Use userMe ID

  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserMe(response.data);
    } catch (error) {
      console.log("Error fetching user data", error);
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
    getMe(); // Хэрэглэгчийн мэдээллийг татаж авч байна
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userMe,
        setUserMe,
        LogOut,
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
