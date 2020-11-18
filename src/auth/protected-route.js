// src/auth/protected-route.js

import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../components/index";
import { withRoleBasedRedirect } from "../auth/with-roles-based-redirect";

const ProtectedRoute = ({ component, requiredRoles, redirectPath, ...args }) =>
  requiredRoles ? (
    <Route
      component={withAuthenticationRequired(
        withRoleBasedRedirect(component, { requiredRoles, redirectPath }),
        {
          onRedirecting: () => <Loading />,
        }
      )}
      {...args}
    />
  ) : (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
      })}
      {...args}
    />
  );

export default ProtectedRoute;
