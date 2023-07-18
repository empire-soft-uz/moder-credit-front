import { useState } from "react";

export const ProductsReadHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};