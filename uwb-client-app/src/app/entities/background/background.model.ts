export interface IBackground {
  id?: number;
  name?: string;
  fileName?: string;
  fileSize?: number;
  path?: string;
  scale?: number;
}

export type NewBackground = Omit<IBackground, 'id'>;
