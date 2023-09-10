import "./home.css";

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/Config";
import Load from "../load/Load";
import { sendEmailVerification } from "firebase/auth";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      console.log("Done Verfication");
      // ...
    });
  };

  if (loading) {
    return <Load />;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <Header />

        <>
          <div className="home-page main">
            <h1>
              Please{" "}
              <Link
                to="/signin"
                style={{
                  color: "teal",
                  textDecoration: "none",
                  borderBottom: "4px solid teal",
                }}
              >
                sign in
              </Link>{" "}
              to continue
            </h1>
          </div>
        </>

        <Footer />
      </>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home Page</title>
          </Helmet>
          <Header />

          <div className="home-page main">
            <div className="home-content">
              <h1>Home</h1>
            </div>
          </div>

          <Footer />
        </>
      );
    }

    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home Page</title>
          </Helmet>
          <Header />

          <div className="home-page main">
            <div className="home-content">
              <h1>Home</h1>
              <h2>Please verify your email to continue</h2>
              <button
                className="btn-all"
                onClick={() => {
                  sendAgain();
                }}
              >
                Send Again
              </button>
            </div>
          </div>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
