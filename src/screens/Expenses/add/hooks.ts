import { useState } from "react";
import { Expense } from "../../../types";

export const ExpensesAddHooks = () => {
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState<Partial<Expense>>({});

  const onSetExpense = (
    key: "amount" | "description" | "duedate",
    value: any
  ) => {
    let obj = { ...expense };
    obj[key] = value;
    setExpense(obj);
  };

  const onSubmit = () => {
    try {
      setLoading(true);

      setTimeout(() => {
        console.log("expense: ", expense);
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return { loading, expense, onSetExpense, onSubmit};
};