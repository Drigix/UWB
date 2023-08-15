import { HttpResponse } from "@angular/common/http";
import { IBackground } from "@entities/background/background.model";
import { IClient } from "@entities/client/client.model";
import { IIcon } from "@entities/icon/icon.model";
import { IObjectType } from "@entities/objects/object-type.model";
import { IObject } from "@entities/objects/object.model";

export type BackgroundResponseType = HttpResponse<IBackground>;
export type BackgroundArrayResponseType = HttpResponse<IBackground[]>;

export type ClientResponseType = HttpResponse<IClient>;
export type ClientArrayResponseType = HttpResponse<IClient[]>;

export type ObjectResponseType = HttpResponse<IObject>;
export type ObjectArrayResponseType = HttpResponse<IObject[]>;

export type ObjectTypeResponseType = HttpResponse<IObjectType>;
export type ObjectTypeArrayResponseType = HttpResponse<IObjectType[]>;

export type IconResponseType = HttpResponse<IIcon>;
export type IconArrayResponseType = HttpResponse<IIcon[]>;
