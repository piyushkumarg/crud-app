import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid justify-content-center">
          <NavLink className="navbar-brand" to="/">
            CRUD
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
