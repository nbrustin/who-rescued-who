import React, { useState } from "react";
import Animal from "./Animal";
import Row from "react-bootstrap/Row";

const Animals = ({ posts }: { posts: any }) => {
  return (
    <>
      <Row>
        {posts.map((animal: any, index: number) => {
          return <Animal animal={animal} />;
        })}
      </Row>
    </>
  );
};

export default Animals;
