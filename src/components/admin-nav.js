import React from "react";
import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/use-admin";
import { roleStates } from "../hooks/role-states";

const AdminNav = () => {
  const role = useAdmin();

  if (role === roleStates.ADMIN) {
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
  }

  return null;
};

export default AdminNav;
