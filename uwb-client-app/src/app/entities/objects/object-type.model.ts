import { IClient } from "@entities/client/client.model";

export interface IObjectType {
  id?: number;
  name?: string;
  adminOnly?: boolean;
  client?: IClient;
}

export type NewObjectType = Omit<IObjectType, 'id'>;
