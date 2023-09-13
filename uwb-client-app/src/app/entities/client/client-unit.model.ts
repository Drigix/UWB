import { IClient } from "./client.model";

export interface IClientUnit {
  data: IClient;
  children: IClientUnit[];
}
