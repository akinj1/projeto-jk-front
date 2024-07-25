import { useAuth } from "@/hooks";
import { NavBarMenu, SideBarMenu } from "@/components";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export const HomeLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname ?? "/";
  const [open, setOpen] = useState(false);

  if (!user) return <Navigate to={from} replace />;
  return (
    <>
      <div className="h-full">
        <NavBarMenu setOpen={setOpen} open={open}/>
        <SideBarMenu open={open} setOpen={setOpen}/>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
