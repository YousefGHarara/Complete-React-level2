import "./signup.css";

import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Helmet } from "react-helmet-async";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/Config";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Load from "../load/Load";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errAccount, setErrAccount] = useState("");

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate("/");
    }
  });

  const signUpBTN = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          console.log("Done Verfication");
          // ...
        });

        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            console.log("Done !!");
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error !!");
        console.log(errorCode);
        switch (errorCode) {
          case "auth/missing-email":
            setErrAccount("Err E-mail");
            break;
          default:
            setErrAccount(errorCode);
        }
      });
  };

  if (loading) {
    return <Load />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Sign Up Page</title>
        </Helmet>

        <Header />
        <div className="my-signup main">
          <div className="signup__content">
            <form action="">
              <h2 className="signup__input__title">Sign up to continue</h2>
              <input
                type="text"
                placeholder="Username"
                className="signup__input-username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                className="signup__input-email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="signup__input-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="signup__btn-submit"
                onClick={(e) => {
                  signUpBTN(e);
                }}
              >
                Sign up
              </button>
              <p>
                if you have an account <Link to="/signin">Sign in</Link>
              </p>
            </form>
            {errAccount && (
              <p style={{ color: "red", marginTop: "10px" }}>{errAccount}</p>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user && !user.emailVerified) {
    return (
      <>
        <Helmet>
          <title>Sign Up Page</title>
        </Helmet>

        <Header />

        <div className="main page-verify">
          <h1>We send you an email to verify your Account</h1>
          <button className="btn-all">Send Again</button>
        </div>

        <Footer />
      </>
    );
  }
};

export default SignUp;
