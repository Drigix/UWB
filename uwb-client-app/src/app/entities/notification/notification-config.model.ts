import { IArea } from "@entities/area/area.model";
import { INotificationType } from "./notification-type.model";
import { IClient } from "@entities/client/client.model";

export interface INotificationConfig {
  id?: number;
  title?: string;
  message?: string;
  areas?: IArea[];
  type?: INotificationType;
  areaIds?: Pick<IArea, 'id'>[];
  notificationTypeId?: Pick<INotificationType, 'id'>
  organizationUnitId?: number
}

export interface INotificationConfigDTO extends INotificationConfig {
  areas?: Pick<IArea, 'id'>[];
  type?: Pick<INotificationType, 'id'>;
}

export type NewNotificationConfig = Omit<INotificationConfigDTO, 'id'>;
