import { User } from "@/models/user";
import { httpService } from "./httpService";


export const login = (data: {email: string, password: string}) => {
  return httpService.post("/user/login", data);
};

export const useWhoAmI = () => {
  return httpService.get("/user/whoami");
};

export const createUser = (user: User) => {
  return httpService.post("/user", user);
};

export const updateUser = (user: User) => {
  return httpService.put("/user", user);
};

export const getAllUsers = () => {
  return httpService.get("/user/getAll");
};

export const getUserById = (id?: string) => {
  return httpService.get("/user/" + id);
};