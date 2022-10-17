import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Header from "./layouts/Header";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const ThemeContext = React.createContext(true);

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = !darkTheme ? "#292929" : "#f3f2f2";
  }
  const themeStyles = {
    backgroundColor: darkTheme ? "#292929" : "#f3f2f2",
  };
  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <Container>
          <Header toggleTheme={toggleTheme} darkTheme={darkTheme} />
          <Routes>
            <Route path="/who-rescued-who" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Container>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
