import { IClient } from "@entities/client/client.model";
import { IObjectType } from "./object-type.model";
import { IIcon } from "@entities/icon/icon.model";

export interface IObject {
  id?: number;
  name?: string;
  lastName?: string;
  tagId?: number;
  hexTagId?: string;
  icon?: IIcon;
  configuration?: string;
  client?: IClient;
  type?: IObjectType
}

export type NewObject = Omit<IObject, 'id'>;
