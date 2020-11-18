import PropTypes from "prop-types";
import { useRoles } from "../auth/use-roles";
import { useEffect, useState } from "react";

export const HasAccessRole = ({
  requiredRoles,
  grantComponent,
  rejectComponent,
}) => {
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
    checkUserRoles(requiredRoles);
  }, [userRoles, requiredRoles]);

  if (userRoles === null) {
    return null;
  }

  return isAuthorized ? <>{grantComponent}</> : <>{rejectComponent || null}</>;
};

HasAccessRole.propTypes = {
  requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  grantComponent: PropTypes.element.isRequired,
  rejectComponent: PropTypes.element,
};
