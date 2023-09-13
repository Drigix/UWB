export interface IRole {
  id?: number;
  name?: string;
}

export const RoleTableConst: IRole[] = [
  {
    id: 1,
    name: "ADMIN"
  },
  {
    id: 2,
    name: "UŻYTKOWNIK"
  }
];
