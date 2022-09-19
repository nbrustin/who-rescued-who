import React, { useState } from "react";
import Animal from "./Animal";
import Row from "react-bootstrap/Row";

const Animals = ({
  posts,
  isShowFavoriteButton,
}: {
  posts: any;
  isShowFavoriteButton: boolean;
}) => {
  return (
    <>
      <Row>
        {posts.map((animal: any, index: number) => {
          return (
            <Animal
              animal={animal}
              isShowFavoriteButton={isShowFavoriteButton}
            />
          );
        })}
      </Row>
    </>
  );
};

export default Animals;
