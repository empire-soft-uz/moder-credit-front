import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/ROUTES";

export const DashboardHooks = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [authenticated] = useState(true);

  const effect = () => {
    if (!authenticated) {
      navigate("/login");
    } else {
      if (location.pathname.length > 9) {
        if (
          location.pathname === ROUTES.DASHBOARD ||
          location.pathname === `${ROUTES.DASHBOARD}/`
        ) {
          navigate("/dashboard/main");
        }
      }
    }
  };

  useEffect(() => {
    effect();
  });

  return { authenticated };
};