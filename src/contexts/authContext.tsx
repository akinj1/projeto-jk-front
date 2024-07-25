import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useWhoAmI, getAllRoles } from "@/utils";
import { User } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import { Role } from "@/models/role";

type AuthProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

type AuthProviderState = {
  token?: string;
  setUser: (data: User) => void;
  setUsers: (data: User[]) => void;
  setToken: (data: string | null) => void;
  logout: () => void;
  user?: User;
  users?: User[];
  roles?: Role[];
  userLoading: boolean;
};

export const AuthProviderContext = createContext<AuthProviderState>(
  {} as AuthProviderState
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    const token = Cookies.get("token");
    if (!token) return null;
    return token;
  });
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();
  const [roles, setRoles] = useState<Role[]>();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const {
    data: whoAmIData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["useWhoAmI"],
    queryFn: useWhoAmI,
    enabled: !!token,
  });

  const {
    data: roleData,
    isLoading: roleIsLoading,
    error: roleErro,
  } = useQuery({
    queryKey: ["getAllRoles"],
    queryFn: getAllRoles,
    enabled: !!token,
  });

  const logout = () => {
    setToken(null);
    setUser({} as User);
    Cookies.set("token", "");
  };

  useEffect(() => {
    if (token && whoAmIData && !isLoading && !error) {
      setUser(whoAmIData.data.user);
    }
    if (user) {
      setUserLoading(false);
    }
    if (!roleErro && !roleIsLoading && roleData) {
      setRoles(roleData.data);
    }
    if (!token) {
      setUserLoading(false);
    }
  }, [
    token,
    whoAmIData,
    isLoading,
    error,
    user,
    roleErro,
    roleIsLoading,
    roleData,
  ]);

  const value = {
    user,
    users,
    userLoading,
    roles,
    setUsers,
    setUser,
    setToken,
    logout,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
