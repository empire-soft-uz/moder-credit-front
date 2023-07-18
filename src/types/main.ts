import { BaseData, } from ".";

export type Main = BaseData & {
  deposits:string;
  totalProfits:string;
  totalExpense:string;
  totalWithProfits:string;
  currentDeposit:string;
};