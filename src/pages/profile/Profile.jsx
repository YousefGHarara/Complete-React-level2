import "./profile.css";

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { auth } from "../../firebase/Config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";
import Load from "../load/Load";
import { deleteUser } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }
  });

  const deleteBTN = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("Done Delete !!");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(error.message);
        console.log(error.code);
      });
  };

  if (user && !user.emailVerified) {
    navigate("/");
  }

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
  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
        </Helmet>

        <Header />

        {user && (
          <>
            <div className="my-profile main">
              <div className="profile-content">
                <h2>Welcome : {user.displayName}</h2>
                <h2>E-mail : {user.email}</h2>
                <h2>
                  Create At :
                  <Moment fromNow date={user.metadata.createAt} />
                </h2>
                <h2>
                  Last Sign in :
                  <Moment fromNow date={user.metadata.lastSignInTime} />
                </h2>
                <button className="btn-delete" onClick={() => deleteBTN()}>
                  Delete
                </button>
              </div>
            </div>
          </>
        )}

        <Footer />
      </>
    );
  }
};

export default Profile;
