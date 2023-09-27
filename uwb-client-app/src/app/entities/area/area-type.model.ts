export interface IAreaType {
  id?: number;
  name?: string;
  color?: string;
  organizationUnitId?: number;
}

export type NewAreaType = Omit<IAreaType, 'id'>;
