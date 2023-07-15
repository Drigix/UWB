import { MenuItem } from "primeng/api";

export interface IMenuItem extends MenuItem {
  auth?: string[];
}
