import React from "react";
import { Redirect } from "react-router-dom";

import useAdmin from "../hooks/use-admin";
import { roleStates } from "../hooks/role-states";
import ProtectedRoute from "./protected-route";

const AdminRoute = (props) => {
  const role = useAdmin();

  if (role === roleStates.UNKNOWN) {
    return null;
  }

  if (role === roleStates.ADMIN) {
    return <ProtectedRoute {...props} />;
  }

  return <Redirect to="/" />;
};

export default AdminRoute;
