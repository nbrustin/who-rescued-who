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
  return (
    <>
      <h1 className="text-center">Favorites</h1>
      <h3 className={favorites.length !== 0 ? "d-none mt-4" : "mt-4"}>
        No favorites added...yet!
      </h3>
      <Animals posts={favorites} />
    </>
  );
};

export default Favorites;
