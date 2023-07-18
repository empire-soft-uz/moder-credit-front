import { useState } from "react";
import { Payment } from "../../../types";

export const PaymentsAddHooks = () => {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<Partial<Payment>>({});

  const onSetPayment = (
    key: "index" | "credit_id" | "paid_amount",
    value: any
  ) => {
    let obj = { ...payment };
    obj[key] = value;
    setPayment(obj);
  };

  const onSubmit = () => {
    try {
      setLoading(true);

      setTimeout(() => {
        console.log("payment: ", payment);
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return { loading, payment, onSetPayment, onSubmit };
};