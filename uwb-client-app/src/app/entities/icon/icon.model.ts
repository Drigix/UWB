import { IClient } from "@entities/client/client.model";

export interface IIcon {
  id?: number;
  name?: string;
  fullPath?: string;
  fileName?: string;
  fileSize?: number;
  pathArrayBuffer?: string;
  path?: string;
  organizationUnitId?: number;
}

export type NewIcon = Omit<IIcon, 'id'>;
