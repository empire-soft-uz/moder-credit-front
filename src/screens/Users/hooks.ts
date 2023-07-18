import { useEffect, useState } from "react";


import { REQUESTS } from "../../api/requests";
import { User } from "../../types";

export const UsersHooks = () => {

  const [users, setUsers] = useState<User[]>([])

  const [loading, setLoading] = useState(false)


  // const createUser = async (user: Partial<User>) => {
  //   try {
  //     await REQUESTS.user.add(user)
  //   } catch (error) {

  //   }
  // }

  const effect = async () => {
    setLoading(true)
    try {
      const res = await REQUESTS.user.get();
      setUsers(res.data.users)
    } catch (e) {
      console.log("e: ", e);
    }
    setLoading(false)
  };

  useEffect(() => {
    effect();
  }, []);

  return {
    data: users,
    loading,
    fetchUsers: effect,
    // createUser
  };
};