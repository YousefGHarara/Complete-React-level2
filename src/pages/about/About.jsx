import "./about.css";

import { Helmet } from "react-helmet-async";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Config";
import Load from '../load/Load';

const About = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }

    if(user && !user.emailVerified){
      navigate("/");
    }
  });



  if (loading || (user && !user.emailVerified)) {
    return (
      <Load />
    );
  }


  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user && user.emailVerified) {

    return (
      <>
        <Helmet>
          <title>About Page</title>
        </Helmet>
  
        <Header />
        <div className="my-about main">
          <h1>About Page</h1>
        </div>
        <Footer />
      </>
    );
  }




};

export default About;
