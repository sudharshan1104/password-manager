import { useAuth } from "./Auth";
import { Navigate } from "react-router-dom";

import React from "react";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth.superUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
