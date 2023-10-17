export interface INotification {
  id?: number;
  title?: string;
  date?: Date;
  message?: string;
  objectFullName?: string;
  areaName?: string;
}

export type NewNotification = Omit<INotification, 'id'>;
