import "./blog.css";

import { Helmet } from "react-helmet-async";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useAuthState } from "react-firebase-hooks/auth";

import React, { useEffect } from "react";
import { auth } from "../../firebase/Config";
import { useNavigate } from "react-router-dom";
import Load from "../load/Load";

const Blog = () => {
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

  
  if (loading) {
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
  if (user) {

    return (
      <>
        <Helmet>
          <title>Blog Page</title>
        </Helmet>
        <Header />
        <div className="my-blog main">
          <h1>Blog Page</h1>
        </div>
        <Footer />
      </>
    );
  }


};

export default Blog;
