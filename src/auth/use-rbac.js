import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { RoleAccessState } from "./user-roles";

export const useRBAC = (requiredUserRoles) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [state, setState] = useState(null);

  useEffect(() => {
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

    if (!(requiredUserRoles && audience)) {
      return;
    }

    if (isLoading || isAuthenticated) {
      return;
    }

    const rolesProperty = new URL("roles", audience).href;

    if (!user) {
      setState(RoleAccessState.REJECTED);
      return;
    }

    const userRoles = user[rolesProperty];

    if (!userRoles) {
      setState(RoleAccessState.REJECTED);
      return;
    }

    const userHasRequiredRoles = requiredUserRoles.every((role) =>
      userRoles.includes(role)
    );

    if (!userHasRequiredRoles) {
      setState(RoleAccessState.REJECTED);
    }

    setState(RoleAccessState.GRANTED);
  }, [user, requiredUserRoles, isLoading, isAuthenticated]);

  return state;
};
