import { useEffect, useState } from "react";


import { REQUESTS } from "../../api/requests";
import { Payment } from "../../types";

export const PaymentsHooks = () => {

  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(false)

  const deletePayment = async (id: string) => {
    try {
      await REQUESTS.payment.delete(id)
    } catch (error) {

    }
  }

  const createPayment = async (payment: Partial<Payment>) => {
    try {
      await REQUESTS.payment.add(payment)
    } catch (error) {

    }
  }

  const updatePayment = async (payment: Partial<Payment>) => {
    try {
      await REQUESTS.payment.edit(payment)
    } catch (error) {
      return error;
    }
  }

  const effect = async () => {
    setLoading(true)
    try {
      const res = await REQUESTS.payment.get();
      setPayments(res.data.data)
    } catch (e) {
      console.log("e: ", e);
    }
    setLoading(false)
  };

  useEffect(() => {
    effect();
  }, []);

  return {
    data: payments,
    loading,
    fetchPayments: effect,
    deletePayment,
    createPayment,
    updatePayment
  };
};