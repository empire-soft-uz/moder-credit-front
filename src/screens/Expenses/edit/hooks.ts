import { useState } from "react";

export const ExpensesEditHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};