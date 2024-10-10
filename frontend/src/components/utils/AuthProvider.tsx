// "use client";

// import { api } from "@/axios";
// import { usePathname, useRouter, useParams } from "next/navigation";
// import {
//   PropsWithChildren,
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   ReactNode,
// } from "react";
// import { toast } from "react-toastify";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   role?: string;
// }

// interface AuthUser {
//   user: User | null;
//   isAuthenticated: boolean;
//   role?: string;
// }

// interface AuthContextType {
//   user: AuthUser;
//   register: (user: User) => void;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: { user: null, isAuthenticated: false, role: undefined },
//   register: () => {},
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   const [user, setUser] = useState<AuthUser>({
//     user: null,
//     isAuthenticated: false,
//     role: undefined,
//   });

//   const router = useRouter();
//   const { id } = useParams();
//   const [isReady, setIsReady] = useState(false);
//   const pathname = usePathname();
//   const authPaths = ["/login", "/register", "/product", `/product/${id}`];

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       (async () => {
//         try {
//           const response = await api.get("/auth/me", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const user = response.data;
//           setUser({
//             user,
//             isAuthenticated: true,
//             role: user.role,
//           });
//         } catch (error) {
//           console.error("Токен буруу эсвэл хэрэглэгч олдсонгүй:", error);
//           logout();
//         }
//       })();
//     }
//     setIsReady(true);
//   }, []);

//   const register = async (newUser: User) => {
//     try {
//       const response = await api.post("/auth/register", newUser);
//       const { token, user } = response.data;

//       setUser({
//         user,
//         isAuthenticated: true,
//         role: user.role,
//       });
//       toast.success("Бүртгэл амжилттай!");

//       const redirectPath = user.role === "admin" ? "/admin" : "/";
//       router.push(redirectPath);

//       localStorage.setItem("token", token);
//     } catch (error) {
//       toast.error("Бүртгэлтэй байна!");
//       console.error("Бүртгэлийн алдаа", error);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await api.post("/auth/login", { email, password });
//       const { token, user } = response.data;

//       setUser({
//         user,
//         isAuthenticated: true,
//         role: user.role,
//       });
//       toast.success("Нэвтрэлт амжилттай");

//       const redirectPath = user.role === "admin" ? "/admin" : "/";
//       router.push(redirectPath);

//       localStorage.setItem("token", token);
//     } catch (error) {
//       toast.error("Нууц үг эсвэл имэйл буруу байна!");
//       console.error("Нэвтрэх алдаа:", error);
//     }
//   };

//   const logout = () => {
//     setUser({ user: null, isAuthenticated: false, role: undefined });

//     toast.success("Системээс гарсан!");

//     localStorage.removeItem("token");

//     router.push("/");
//   };

//   if (!isReady) {
//     return <div>Ачаалж байна...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ user, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
