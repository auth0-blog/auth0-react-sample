import React, { useEffect, useState } from "react";

import { useRoles } from "../auth/use-roles";

export const withRoleBasedRender = (Component, options) => (props) => {
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
      }
    }
    checkUserRoles(options.requiredRoles);
  }, [userRoles]);

  return isAuthorized ? <Component {...props} /> : null;
};
