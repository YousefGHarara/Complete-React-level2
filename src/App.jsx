import "./assets/globalcss.css";
import './assets/mobilecss.css';

import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Blog from "./pages/blog/Blog";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import Load from "./pages/load/Load";
import Error from "./pages/error/Error";

import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./context/DataProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/Config";

function App() {
  const { theme } = useContext(DataContext);
  // const [user, loading, error] = useAuthState(auth);


  // if (loading) {
  //   return (
  //     <Load /> 
  //   );
  // }

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/load" element={<Load />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
