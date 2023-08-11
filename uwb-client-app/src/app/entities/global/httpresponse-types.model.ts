import { HttpResponse } from "@angular/common/http";
import { IBackground } from "@entities/background/background.model";

export type BackgroundResponseType = HttpResponse<IBackground>;
export type BackgroundArrayResponseType = HttpResponse<IBackground[]>;
