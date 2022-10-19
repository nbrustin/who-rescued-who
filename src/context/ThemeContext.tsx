import React, { useState, useContext } from "react";

const ThemeContext = React.createContext(true);
const ThemeUpdateContext = React.createContext(() => {});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = darkTheme ? "#efeef1" : "#292929";
  };
  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
