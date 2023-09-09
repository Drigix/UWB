import { IRole } from "@entities/auth/role.model";

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  langKey?: string;
  theme?: string;
  roles?: IRole[];
}

export interface IUpdateUser extends IUser {
  roleIds?: number[];
}

export type UpdateUser = Omit<IUpdateUser, 'roles'>;
