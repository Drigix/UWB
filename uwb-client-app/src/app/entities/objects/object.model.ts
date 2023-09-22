import { IClient } from "@entities/client/client.model";
import { IObjectType } from "./object-type.model";
import { IIcon } from "@entities/icon/icon.model";

export interface IObject {
  id?: number;
  name?: string;
  secondName?: string;
  tagId?: number;
  hexTagId?: string;
  configuration?: string;
  uwbObjectType?: IObjectType
}

export type NewObject = Omit<IObject, 'id'>;
