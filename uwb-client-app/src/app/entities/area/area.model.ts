import { IBackground } from "@entities/background/background.model";
import { IAreaType } from "./area-type.model";

export interface IArea {
  id?: number;
  name?: string;
  color?: string;
  areaType?: IAreaType;
  backgroundId?: number;
}

export type NewArea = Omit<IArea, 'id'>;
