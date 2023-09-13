import { IRole } from "@entities/auth/role.model";

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  langKey?: string;
  theme?: string;
  roles?: IRole[];
  organizationUnitId?: number;
}

export interface NewUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  roleIds?: number[];
  organizationUnitId?: number;
}

export interface IUpdateUser extends IUser {
  roleIds?: number[];
}

export type UpdateUser = Omit<IUpdateUser, 'roles'>;
