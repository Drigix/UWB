import { IClient } from "@entities/client/client.model";
import { IIcon } from "@entities/icon/icon.model";

export interface IObjectType {
  id?: number;
  name?: string;
  adminOnly?: boolean;
  organizationUnitId?: number;
  uwbObjectIcon?: IIcon;
}

export type NewObjectType = Omit<IObjectType, 'id'>;
