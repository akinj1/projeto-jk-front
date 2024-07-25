import { Role } from "./role";

export type User = {
  id?: string;
  email: string;
  userName: string;
  token?: string;
  password?: string;
  firstName?: string;
  surName?: string;
  lastName?: string;
  role?: Role;
};