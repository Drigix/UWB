export interface IAreaType {
  id?: number;
  name?: string;
  color?: string;
}

export type NewAreaType = Omit<IAreaType, 'id'>;
