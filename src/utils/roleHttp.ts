import { httpService } from "./httpService";

export const getAllRoles = () => {
  return httpService.get("/role");
};
