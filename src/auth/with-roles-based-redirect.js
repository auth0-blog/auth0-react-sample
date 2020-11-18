import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useRoles } from "../auth/use-roles";

export const withRoleBasedRedirect = (Component, options) => (props) => {
  const history = useHistory();

  const userRoles = useRoles();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (userRoles === null) {
      return;
    }

    async function checkUserRoles(requiredRoles) {
      const userHasRequiredRoles = requiredRoles.every((role) =>
        userRoles.includes(role)
      );

      if (userHasRequiredRoles) {
        setIsAuthorized(true);
        return;
      }

      history.push(options.redirectPath || "/");
    }
    checkUserRoles(options.requiredRoles);
  }, [userRoles, history]);

  return isAuthorized ? <Component {...props} /> : null;
};
