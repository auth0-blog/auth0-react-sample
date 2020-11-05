import React from "react";
import { NavLink } from "react-router-dom";

import { CanAccess } from "../auth/can-access";

const AdminNav = () => {
  const Bar = () => (
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

  return <CanAccess roles={["messages-admin"]} grantComponent={<Bar />} />;
};

export default AdminNav;
