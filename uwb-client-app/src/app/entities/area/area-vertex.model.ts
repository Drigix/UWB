import { IArea } from "./area.model";

export interface IAreaVertex {
  id?: number;
  lp?: number;
  x?: number;
  y?: number;
  area?: IArea;
  areaId?: number;
}

export type NewAreaVertex = Omit<IAreaVertex, 'id'>;
