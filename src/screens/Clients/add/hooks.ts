import { useState } from "react";
import { Client } from "../../../types";

export const ClientsAddHooks = () => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Partial<Client>>({});

  const onSetClient= (
    key: "name" | "phone" | "address" ,
    value: any
  ) => {
    let obj = { ...client };
    obj[key] = value;
    setClient(obj);
  };

  const onSubmit = () => {
    try {
      setLoading(true);

      setTimeout(() => {
        console.log("client: ", client);
        setLoading(false);
      }, 3000);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return { loading, client, onSetClient, onSubmit };
};