export interface IAnchor {
  id?: number;
  name?: string;
  x?: number;
  y?: number;
  z?: number;
  xPx?: number;
  yPx?: number;
  syncsrc?: number;
  syncaddr?: string;
  backgroundId?: number;
  error?: number | null;
  color?: string;
}

export type NewAnchor = Omit<IAnchor, 'id'>;
