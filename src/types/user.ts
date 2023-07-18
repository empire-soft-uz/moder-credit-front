import { BaseData, } from ".";

export type User = BaseData & {
  // id:number;
  email:string;
  firstName:string;
  lastName:string;
  password:string;
  date:Date;
};
