import { BaseData, } from ".";

export type Expense = BaseData & {
  id: number;
  amount: number;
  description: string;
  duedate: Date;
};