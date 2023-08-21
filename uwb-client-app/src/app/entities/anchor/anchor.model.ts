import { IBackground } from "@entities/background/background.model";
import { IClient } from "@entities/client/client.model";

export interface IAnchor {
  id?: number;
  name?: string | null;
  x?: number | null;
  y?: number | null;
  z?: number | null;
  xPx?: number | null;
  yPx?: number | null;
  syncsrc?: number | null;
  syncaddr?: string | null;
  background?: IBackground | null;
  error?: number | null;
  color?: string | null;
}

export type NewAnchor = Omit<IAnchor, 'id'>;
