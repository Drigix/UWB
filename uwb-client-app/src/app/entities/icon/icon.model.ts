import { IClient } from "@entities/client/client.model";

export interface IIcon {
  id?: number;
  name?: string;
  fileName?: string;
  fileSize?: number;
  path?: string;
  client?: IClient;
}

export type NewIcon = Omit<IIcon, 'id'>;
