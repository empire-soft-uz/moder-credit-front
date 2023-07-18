import { useEffect, useState } from "react";


import { REQUESTS } from "../../api/requests";
import { Credit } from "../../types";

export const CreditsHooks = () => {

  const [credits, setCredits] = useState<Credit[]>([])
  const [loading, setLoading] = useState(false)

  const deleteCredit = async (id: number) => {
    try {
      await REQUESTS.credit.delete(id)
    } catch (error) {

    }
  }

  const createCredit = async (credit: Partial<Credit>) => {
    try {
      await REQUESTS.credit.add(credit)
    } catch (error) {

    }
  }

  const updateCredit = async (credit: Partial<Credit>) => {
    try {
      await REQUESTS.credit.edit(credit)
    } catch (e) {
      return e;
    }
  }

  const effect = async () => {
    setLoading(true)
    try {
      const res = await REQUESTS.credit.get();

      setCredits(res.data.data)

    } catch (e) {
      console.log("e: ", e);
    }
    setLoading(false)
  };

  useEffect(() => {
    effect();
  }, []);

  return {
    data: credits,
    loading,
    fetchCredits: effect,
    deleteCredit,
    createCredit,
    updateCredit,
  };
};
