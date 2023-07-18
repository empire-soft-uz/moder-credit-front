import { useState } from "react";

export const ClientsReadHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};