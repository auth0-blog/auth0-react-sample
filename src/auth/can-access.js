import { RoleAccessState } from "./user-roles";
import { useRBAC } from "./use-rbac";

import PropTypes from "prop-types";

export const CanAccess = ({ roles, grantComponent, rejectComponent }) => {
  const access = useRBAC(roles || []);

  if (access === null) {
    return null;
  }

  if (access === RoleAccessState.GRANTED) {
    return <>{grantComponent}</>;
  }

  if (access === RoleAccessState.REJECTED) {
    return <>{rejectComponent || null}</>;
  }
};

CanAccess.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  grantComponent: PropTypes.element.isRequired,
  rejectComponent: PropTypes.element,
};
