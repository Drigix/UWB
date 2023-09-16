export interface IBackground {
  id?: number;
  name?: string;
  fullPath?: string;
  fileName?: string;
  fileSize?: number;
  path?: string;
  pathArrayBuffer?: string;
  scale?: number;
  organizationUnitId?: number;
}

export type NewBackground = Omit<IBackground, 'id'>;
