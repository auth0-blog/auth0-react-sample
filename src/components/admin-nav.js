import React from "react";
import { NavLink } from "react-router-dom";

import { withRoleBasedRender } from "../auth/with-roles-based-render";

const AdminNav = () => {
  return (
    <div className="navbar-nav">
      <NavLink
        to="/admin"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Admin
      </NavLink>
    </div>
  );
};

export default withRoleBasedRender(AdminNav, {
  requiredRoles: ["messages-admin"],
});
