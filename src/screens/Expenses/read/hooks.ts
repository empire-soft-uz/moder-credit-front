import { useState } from "react";

export const ExpensesReadHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};