import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const user = useSelector((state) => state.session.user);

  const sessionUser = useSelector((state) => state.session.user);


  return (
    <div className="combined-bar">
      <div className="navbar">
        <h2 className="lom-title">LeanOnMe</h2>
        <div className="nav-right">
          {!user ? (
            <>
              <NavLink to="/login" className="login">
                Log In
              </NavLink>
              <p className="link-divider">|</p>
              <NavLink to="/signup" className="signup">
                Sign Up
              </NavLink>
            </>
          ) : (
            <NavLink to="/home" className="signup">
              My Account
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
