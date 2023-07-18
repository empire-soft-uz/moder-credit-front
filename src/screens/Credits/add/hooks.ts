import { useState } from "react";
import { Credit, Client, Product } from "../../../types";


export const CreditsAddHooks = () => {
  const [loading, setLoading] = useState(false);
  const [credit, setCredit] = useState<Partial<Credit>>({});

  const onSetCredit = (
    key: "client_id" | "product_id" | "client_deposit" | "deposit_amount" | "period" | "percent" | "status",
    value: any
  ) => {
    let obj = { ...credit };
    obj[key] = value;
    setCredit(obj);
  };


  const onSubmit = () => {
    try {
      setLoading(true);

      setTimeout(() => {
        console.log("credit: ", credit);
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return { loading, credit, onSetCredit, onSubmit };
};

