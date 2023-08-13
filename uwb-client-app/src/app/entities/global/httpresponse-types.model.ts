import { HttpResponse } from "@angular/common/http";
import { IBackground } from "@entities/background/background.model";
import { IClient } from "@entities/client/client.model";

export type BackgroundResponseType = HttpResponse<IBackground>;
export type BackgroundArrayResponseType = HttpResponse<IBackground[]>;

export type ClientResponseType = HttpResponse<IClient>;
export type ClientArrayResponseType = HttpResponse<IClient[]>;
