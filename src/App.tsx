import React from "react";
import "./App.css";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Header from "./layouts/Header";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <Container>
          <Header />
          <Routes>
            <Route path="/who-rescued-who" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
