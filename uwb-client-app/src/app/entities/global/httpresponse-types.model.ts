import { HttpResponse } from "@angular/common/http";
import { IAnchor } from "@entities/anchor/anchor.model";
import { IAreaType } from "@entities/area/area-type.model";
import { IAreaVertex } from "@entities/area/area-vertex.model";
import { IArea } from "@entities/area/area.model";
import { IAuthenticationToken } from "@entities/auth/token.model";
import { IBackground } from "@entities/background/background.model";
import { IClientUnit } from "@entities/client/client-unit.model";
import { IClient } from "@entities/client/client.model";
import { IIcon } from "@entities/icon/icon.model";
import { ILocalization } from "@entities/localization/localization.model";
import { INotificationConfig } from "@entities/notification/notification-config.model";
import { INotificationType } from "@entities/notification/notification-type.model";
import { INotification } from "@entities/notification/notification.model";
import { IObjectType } from "@entities/objects/object-type.model";
import { IObject } from "@entities/objects/object.model";
import { IUser } from "@entities/user/user.model";

export type AuthenticationTokenResponseType = HttpResponse<IAuthenticationToken>;

export type UserResponseType = HttpResponse<IUser>;
export type UserArrayResponseType = HttpResponse<IUser[]>;

export type BackgroundResponseType = HttpResponse<IBackground>;
export type BackgroundArrayResponseType = HttpResponse<IBackground[]>;

export type ClientResponseType = HttpResponse<IClient>;
export type ClientUnitResponseType = HttpResponse<IClientUnit>;
export type ClientArrayResponseType = HttpResponse<IClient[]>;
export type ClientUnitArrayResponseType = HttpResponse<IClientUnit[]>;

export type ObjectResponseType = HttpResponse<IObject>;
export type ObjectArrayResponseType = HttpResponse<IObject[]>;

export type ObjectTypeResponseType = HttpResponse<IObjectType>;
export type ObjectTypeArrayResponseType = HttpResponse<IObjectType[]>;

export type IconResponseType = HttpResponse<IIcon>;
export type IconArrayResponseType = HttpResponse<IIcon[]>;

export type AreaTypeResponseType = HttpResponse<IAreaType>;
export type AreaTypeArrayResponseType = HttpResponse<IAreaType[]>;

export type AreaResponseType = HttpResponse<IArea>;
export type AreaArrayResponseType = HttpResponse<IArea[]>;

export type AreaVertexResponseType = HttpResponse<IAreaVertex>;
export type AreaVertexArrayResponseType = HttpResponse<IAreaVertex[]>;

export type AnchorsResponseType = HttpResponse<IAnchor>;
export type AnchorsArrayResponseType = HttpResponse<IAnchor[]>;

export type LocalizationsArchiveArrayResponseType = HttpResponse<ILocalization[]>;

export type NotificationsResponseType = HttpResponse<INotification>;
export type NotificationsArrayResponseType = HttpResponse<INotification[]>;

export type NotificationsConfigResponseType = HttpResponse<INotificationConfig>;
export type NotificationsConfigArrayResponseType = HttpResponse<INotificationConfig[]>;

export type NotificationTypesResponseType = HttpResponse<INotificationType>;
export type NotificationTypesArrayResponseType = HttpResponse<INotificationType[]>;
