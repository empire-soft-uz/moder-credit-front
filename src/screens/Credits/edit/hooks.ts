import { useState } from "react";

export const CreditsEditHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};