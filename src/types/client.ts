import { BaseData } from ".";

export type Client = BaseData & {
  id:number;
  name: string;
  phone:string;
  address:string;
};
