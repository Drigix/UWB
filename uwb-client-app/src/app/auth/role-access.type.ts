import { IRole } from "@entities/auth/role.model";

export const RoleTableConst: IRole[] = [
  {
    id: 1,
    name: "ADMIN"
  },
  {
    id: 2,
    name: "UŻYTKOWNIK"
  }
];

export const ADMIN_ACCESS = ["ADMIN"]
export const LOGGED_USER_ACCESS = ["ADMIN", "USER"];
