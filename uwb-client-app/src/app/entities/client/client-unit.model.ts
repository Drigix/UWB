export interface IClientUnit {
  data: {
    id: number;
    name: string;
    parentOrgUnit: number;
    treePath: string;
    userLimit: number;
    deleted: boolean;
  };
  children: IClientUnit[];
}
