import { useState } from "react";

export const ProductsEditHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};