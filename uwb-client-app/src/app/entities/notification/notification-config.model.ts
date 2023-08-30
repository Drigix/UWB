import { IArea } from "@entities/area/area.model";
import { INotificationType } from "./notification-type.model";

export interface INotificationConfig {
  id?: number;
  title?: string;
  message?: string;
  areas?: IArea[];
  type?: INotificationType;
}

export interface INotificationConfigDTO extends INotificationConfig {
  areas?: Pick<IArea, 'id'>[];
  type?: Pick<INotificationType, 'id'>;
}

export type NewNotificationConfig = Omit<INotificationConfigDTO, 'id'>;
