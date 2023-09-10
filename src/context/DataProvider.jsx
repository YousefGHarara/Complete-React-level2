import React, { createContext, useReducer, useState } from "react";

export const DataContext = createContext();
let initilData = {
  theme:
    localStorage.getItem("theme") === null
      ? "light"
      : localStorage.getItem("theme"),
  username: "Yousef Harara",
  major: "Web Designer",
  age: 19,
};

const DataProvider = ({ children }) => {
  let reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_NAME":
        return { ...state, name: action.newValue };
      case "CHANGE_THEME":
        return { ...state, theme: action.newValue };
      default:
        return state;
    }
  };

  const [theme, dispatch] = useReducer(reducer, initilData);

  const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    dispatch({ type: "CHANGE_THEME", newValue: localStorage.getItem("theme") });
  };

  const values = { ...theme, changeTheme };

  return (
    <div>
      <DataContext.Provider value={values}>{children}</DataContext.Provider>
    </div>
  );
};

export default DataProvider;
