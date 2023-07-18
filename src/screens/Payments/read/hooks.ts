import { useState } from "react";

export const PaymentsReadHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};