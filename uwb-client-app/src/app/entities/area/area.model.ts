import { IBackground } from "@entities/background/background.model";
import { IAreaType } from "./area-type.model";

export interface IArea {
  id?: number;
  name?: string;
  color?: string;
  type?: IAreaType;
  background?: IBackground;
}

export type NewArea = Omit<IArea, 'id'>;
