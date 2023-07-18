import { useState } from "react";

export const ClientsEditHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};