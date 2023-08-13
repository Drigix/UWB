export interface IClient {
  id?: number;
  name?: string;
  userLimit?: number;
  parentOrgUnit?: number;
  treePath?: string;
  deleted?: boolean;
}

export type NewClient = Omit<IClient, 'id'>;
