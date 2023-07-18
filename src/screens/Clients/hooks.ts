import { useEffect, useState } from "react";


import { REQUESTS } from "../../api/requests";
import { Client } from "../../types";

export const ClientsHooks = () => {

  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  const deleteClient = async (id: number) => {
    try {
      await REQUESTS.client.delete(id)
    } catch (error) {

    }
  }
  const updateClient = async (client: Partial<Client>) => {
    try {
      await REQUESTS.client.edit(client)
    } catch (error) {
      return error;
    }
  }

  const createClient = async (client: Partial<Client>) => {
    try {
      await REQUESTS.client.add(client)
    } catch (error) {
      return error;
    }
  }

  // const editClient = async (id:number) =>{
  //   try{
  //     await REQUESTS.client.edit(id)
  //   }
  // }
  const effect = async () => {
    setLoading(true)
    try {
      const res = await REQUESTS.client.get();
      setClients(res.data.data)
    } catch (e) {
      console.log("e: ", e);
    }
    setLoading(false)
  };

  useEffect(() => {
    effect();
  }, []);

  return {
    data: clients,
    loading,
    fetchClients: effect,
    deleteClient,
    createClient,
    updateClient
  };
};