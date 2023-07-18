import { BaseData, MultiLanguageName, Client, Credit } from ".";

export type Product = BaseData & {
  id:number;
  name: string;
  price:number;
    photoUrl?:string;
  imei?: string;
  iCloudLogin?:string;
  iCloudPassword?:string;
  description?: string;
};