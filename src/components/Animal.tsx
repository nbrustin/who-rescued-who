import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import fallbackImageDog from "../Assets/no-image-found-dog.png";
import fallbackImageCat from "../Assets/no-image-found-cat.gif";

const handleFavorite = (animal: object) => {
  console.log(animal);
  const animalFavorites = JSON.parse(
    sessionStorage.getItem("ANIMAL_FAVORITES") || "[]"
  );

  animalFavorites.push(animal);

  sessionStorage.setItem("ANIMAL_FAVORITES", JSON.stringify(animalFavorites));
  //so, need to add this animal info to my favorites array. how do i get all the info? figured it out! now i know!
  //add this animal to favorites array lets just assume we're adding this for now. i think we should pass this to Search.
  console.log(animalFavorites);
  //add this animal to local storage
  // const newAnimalFavorites = [...animalFavorites, animal]
};

const saveToSessionStorage = (animals: any) => {
  sessionStorage.setItem("ANIMAL_FAVORITES", JSON.stringify(animals));
};

const Animal = ({ animal }: { animal: any }) => {
  const objectFitStyle = animal.photos.length !== 0 ? "cover" : "contain";
  const fallBackImageAnimal =
    animal.type.toLowerCase() === "dog" ? fallbackImageDog : fallbackImageCat;
  return (
    <Col md={3} key={animal.id} className="my-4">
      <Card className="h-100" style={{ borderRadius: "8px" }}>
        <Card.Img
          onClick={() => window.open(animal.url, "_blank")}
          style={{
            height: "40vh",
            objectFit: objectFitStyle,
            width: "100%",
            cursor: "pointer",
          }}
          variant="top"
          src={
            animal.photos.length !== 0
              ? animal.photos[0].large
              : fallBackImageAnimal
          }
        />
        <Card.Body>
          <Card.Title
            className="text-center my-4"
            style={{ color: "#076407", fontSize: "30px" }}
          >
            {animal.name}
          </Card.Title>
          <div className="row">
            <Card.Text className="col-md-6">{animal.age}</Card.Text>
            <Card.Text className="col-md-6">{animal.breeds.primary}</Card.Text>
          </div>
          <div className="row">
            <Button
              type="button"
              variant="danger"
              onClick={() => handleFavorite(animal)}
            >
              Favorite
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Animal;
