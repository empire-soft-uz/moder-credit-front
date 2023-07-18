import { useState } from "react";

export const UsersReadHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};