import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginLayout, HomeLayout } from "@/layouts";
import {
  LoginScreen,
  HomeScreen,
  ListUsersScreen,
  UserScreen,
} from "@/screens";
import { RequireAuth } from "./requiresAuth";

export function RootNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={"/"} element={<LoginScreen />} />
        </Route>
        <Route
          path={"/"}
          element={
            <RequireAuth allowedRoles={["USER", "ADMIN"]}>
              <HomeLayout />
            </RequireAuth>
          }
        >
          <Route path={"/home"} element={<HomeScreen />} />
          <Route path={"/users"} element={<ListUsersScreen />} />
        </Route>
        <Route
          path={"/"}
          element={
            <RequireAuth allowedRoles={["USER", "ADMIN"]}>
              <HomeLayout />
            </RequireAuth>
          }
        >
          <Route path={"/user"} element={<UserScreen />} />
          <Route path={"/user/:id"} element={<UserScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
