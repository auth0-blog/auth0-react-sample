import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { roleStates } from "./role-states";

const useAdmin = () => {
  const { user } = useAuth0();
  const [state, setState] = useState(roleStates.UNKNOWN);

  useEffect(() => {
    const adminRole = process.env.REACT_APP_ADMIN_ROLE || null;
    const rolesProp = new URL("roles", process.env.REACT_APP_AUTH0_AUDIENCE)
      .href;

    if (!(adminRole && user)) {
      setState(roleStates.NOT_ADMIN);
      return;
    }

    const userRoles = user[rolesProp];

    if (!userRoles) {
      setState(roleStates.NOT_ADMIN);
      return;
    }

    if (userRoles.includes(adminRole)) {
      setState(roleStates.ADMIN);
    } else {
      setState(roleStates.NOT_ADMIN);
    }
  }, [user]);

  return state;
};

export default useAdmin;
