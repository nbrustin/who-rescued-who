import React from "react";
import "./App.css";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Header from "./layouts/Header";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/who-rescued-who" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
