import "./navbar.css";

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DarkLight from "../darkLightIcon/DarkLight";
import { auth } from "../../firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="navbar">
      <h2 className="logo">
        <Link to="/">
          Si<span>Yousef{user && <>User is Registerd {!user.emailVerified && <>But Not Verify</>}</>}</span>
        </Link>
      </h2>

      <ul className="links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink to="/signin">SignIn</NavLink>
            </li>
            <li>
              <NavLink to="/signup">SignUp</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <Link
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      console.log("Done Sign Out !!");
                      navigate("/signin");
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log("Fail in Sign Out !!");
                    });
                }}
              >
                Sign Out
              </Link>
            </li>
          </>
        )}
        <DarkLight />
      </ul>
    </div>
  );
};

export default Navbar;
