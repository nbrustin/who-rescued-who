import React, { useEffect } from "react";
import Animal from "./Animal";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

type favorite = {
  id: string;
};

//i think this page should have the pagination...

let favoritesIdArray: any = null;
const Animals = ({ posts }: { posts: any }) => {
  useEffect(() => {
    const favorites = JSON.parse(
      sessionStorage.getItem("ANIMAL_FAVORITES") || "[]"
    );

    favoritesIdArray = favorites.map((favorite: favorite) => favorite.id);
  });
  return (
    <Container>
      <Row>
        {posts.map((animal: any, index: number) => {
          return (
            <Animal
              key={animal.id}
              animal={animal}
              favoritesIdArray={favoritesIdArray}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default Animals;
