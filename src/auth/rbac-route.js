import React from "react";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import ProtectedRoute from "./protected-route";
import { CanAccess } from "./can-access";
import { useRBAC } from "./use-rbac";

import { RoleAccessState } from "./user-roles";

export const RBACRoute = (props) => {
  const access = useRBAC(props.roles);

  if (access === null) {
    return null;
  }

  if (access === RoleAccessState.GRANTED) {
    return <ProtectedRoute {...props} />;
  }

  if (access === RoleAccessState.REJECTED) {
    return <Redirect to={props.redirectPath} />;
  }
};

RBACRoute.defaultProps = {
  roles: [],
  redirectPath: "/",
};

CanAccess.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  redirectPath: PropTypes.string,
};
