import "./darklight.css";

import { DataContext } from "../../context/DataProvider";
import React, { useContext } from "react";

const DarkLight = () => {
  const { theme, changeTheme } = useContext(DataContext);

  return (
    <li className="dark-light">
      <div
        className={`icon`}
        onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
      >
        <i className="fa-solid fa-sun sun"></i>
        <i className="fa-solid fa-moon moon"></i>
      </div>
    </li>
  );
};

export default DarkLight;
