import { BaseData } from ".";

export type Payment = BaseData & {
  id: number;
  index?: number;
  credit_id: number;
  paid_amount?: number;
  duedate: Date;
};
