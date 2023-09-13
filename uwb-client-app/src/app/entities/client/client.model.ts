export interface IClient {
  id?: number;
  name?: string;
  parentOrganizationUnitId?: number;
  treePath?: string;
}

export type NewClient = Omit<IClient, 'id'>;
