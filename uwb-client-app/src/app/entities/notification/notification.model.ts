export interface INotification {
  id?: number;
  title?: string;
  date?: Date;
  message?: string;
  objectName?: string;
}

export type NewNotification = Omit<INotification, 'id'>;
