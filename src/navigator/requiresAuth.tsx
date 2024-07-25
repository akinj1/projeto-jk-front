import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { User } from "@/models/user";
import { Spinner } from "@/components";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, userLoading } = useAuth();
  const allowed = allowedRoles ?? ["USER"];
  const location = useLocation();

  const checkHasPermission = (allowedRole: string[], user: User) => {
    const allowRoles = allowedRole?.filter((e) => {
      return user.role?.name == e;
    });
    return !!allowRoles?.length;
  };

  if (userLoading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  if (!user) return <Navigate to="/" state={{ from: location }} />;
  
  if (location.pathname == "/") return <Navigate to="/home" state={{ from: location }} />;

  if (checkHasPermission(allowed, user)) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};
