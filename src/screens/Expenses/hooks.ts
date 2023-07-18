import { useEffect, useState } from "react";


import { REQUESTS } from "../../api/requests";
import { Expense } from "../../types";

export const ExpensesHooks = () => {

  const [expenses, setExpenses] = useState<Expense[]>([])

  const [loading, setLoading] = useState(false)

  const deleteExpense = async (id: number) => {
    try {
      await REQUESTS.expense.delete(id)
    } catch (error) {

    }
  }


  const createExpense = async (expense: Partial<Expense>) => {
    try {
      await REQUESTS.expense.add(expense)
    } catch (error) {
      return error;
    }
  }


  const updateExpense = async (expense: Partial<Expense>) => {
    try {
      await REQUESTS.expense.edit(expense)
    } catch (error) {
      return error;
    }
  }

  const effect = async () => {
    setLoading(true)
    try {
      const res = await REQUESTS.expense.get();
      setExpenses(res.data.data)
    } catch (e) {
      console.log("e: ", e);
    }
    setLoading(false)
  };

  useEffect(() => {
    effect();
  }, []);

  return {
    data: expenses,
    loading,
    fetchExpenses: effect,
    createExpense,
    deleteExpense,
    updateExpense
  };
};