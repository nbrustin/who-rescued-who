import React, { useEffect } from "react";
import Animal from "./Animal";
import Row from "react-bootstrap/Row";

type favorite = {
  id: string;
};

let favoritesIdArray: any = null;
const Animals = ({
  posts,
  isShowFavoriteButton,
}: {
  posts: any;
  isShowFavoriteButton: boolean;
}) => {
  useEffect(() => {
    //get the favorites ids and pass it in as an array or dictionary
    const favorites = JSON.parse(
      sessionStorage.getItem("ANIMAL_FAVORITES") || "[]"
    );

    favoritesIdArray = favorites.map((favorite: favorite) => favorite.id);
    console.log(favoritesIdArray);
  });
  return (
    <>
      <Row>
        {posts.map((animal: any, index: number) => {
          return (
            <Animal
              animal={animal}
              isShowFavoriteButton={isShowFavoriteButton}
              favoritesIdArray={favoritesIdArray}
            />
          );
        })}
      </Row>
    </>
  );
};

export default Animals;
