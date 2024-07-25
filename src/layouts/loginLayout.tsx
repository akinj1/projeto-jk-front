import { Outlet } from "react-router-dom";

export const LoginLayout = () => {

  return (
    <>
      <div className="h-max">
        <Outlet />
      </div>
    </>
  );
};
