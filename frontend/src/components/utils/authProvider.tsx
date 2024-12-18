// "use client";

// import {
//   createContext,
//   useState,
//   ReactNode,
//   useContext,
//   useEffect,
// } from "react";
// import { api } from "@/lib/axios";
// import { useRouter } from "next/navigation";

// type UserMeResponse = {
//   id: string;
//   userName: string;
//   email: string;
//   phone: string;
//   address: string;
//   owog: string;
// };

// type AuthContextType = {
//   userMe: UserMeResponse | undefined;
//   setUserMe: (userMe: UserMeResponse | undefined) => void;
//   LogOut: () => Promise<void>;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [userMe, setUserMe] = useState<UserMeResponse | undefined>();
//   const userId = userMe?.id || ""; // Use userMe ID
//   const router = useRouter();

//   const getMe = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await api.get("/users/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUserMe(response.data);
//     } catch (error) {
//       console.log("Error fetching user data", error);
//     }
//   };

//   const LogOut = async () => {
//     try {
//       localStorage.removeItem("token");
//       setUserMe(undefined);
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout error", error);
//     }
//   };

//   useEffect(() => {
//     getMe();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         userMe,
//         setUserMe,
//         LogOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };

"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userMe, setUserMe] = useState<UserMeResponse | undefined>();
  const router = useRouter();

  const getMe = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log token
    try {
      const response = await api.get("auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Data:", response.data); // Log user data
      setUserMe(response.data);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  const LogOut = async () => {
    try {
      localStorage.removeItem("token");
      setUserMe(undefined);
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []); // Fetch user data when component mounts

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
