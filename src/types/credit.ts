import { BaseData, } from ".";

export type Credit = BaseData & {
  id:number;
  client_id: number;
  product_id:number;
  client_deposit?: number;
  deposit_amount?:number;
  period:number;
  percent:number;
  status:Status[];
};

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
  }