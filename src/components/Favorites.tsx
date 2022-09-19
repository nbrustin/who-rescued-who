import React, { useState, useEffect } from "react";
import Animals from "./Animals";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const animalFavorites = sessionStorage.getItem("ANIMAL_FAVORITES");

    if (animalFavorites !== null) {
      setFavorites(JSON.parse(animalFavorites));
    }
  }, []);
  //map over the favorites...
  return (
    <>
      <h1 className="text-center">Favorites</h1>
      <Animals posts={favorites} />
    </>
  );
};

export default Favorites;
