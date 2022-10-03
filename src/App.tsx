import React from "react";
import "./App.css";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Header from "./layouts/Header";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
