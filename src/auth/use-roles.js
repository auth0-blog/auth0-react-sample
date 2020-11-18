import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const roleClaimType = new URL("roles", audience).href;

export const useRoles = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const getRoles = async () => {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`https://${domain}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();

      console.log(responseData);

      const roles = responseData[roleClaimType];

      setRoles(roles);
    };

    getRoles();
  }, [isAuthenticated, getAccessTokenSilently]);

  return roles;
};
