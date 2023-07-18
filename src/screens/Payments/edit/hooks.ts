import { useState } from "react";

export const PaymentsEditHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};