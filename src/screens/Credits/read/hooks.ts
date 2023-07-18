import { useState } from "react";

export const CreditsReadHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};
