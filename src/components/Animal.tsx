import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import fallbackImageDog from "../Assets/no-image-found-dog.png";
import fallbackImageCat from "../Assets/no-image-found-cat.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";

const handleFavorite = (animal: any) => {
  const animalFavorites = JSON.parse(
    sessionStorage.getItem("ANIMAL_FAVORITES") || "[]"
  );
  animalFavorites.push(animal);
  sessionStorage.setItem("ANIMAL_FAVORITES", JSON.stringify(animalFavorites));
  alert(`${animal.name} added to favorites!`);
};

const Animal = ({
  animal,
  isShowFavoriteButton,
  favoritesIdArray,
}: {
  animal: any;
  isShowFavoriteButton: boolean;
  favoritesIdArray: any;
}) => {
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
            padding: "10px",
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
          <div className={isShowFavoriteButton ? "row" : "row d-none"}>
            <FontAwesomeIcon
              icon={
                favoritesIdArray.includes(animal.id) ? heartSolid : heartOutline
              }
              style={{ color: "red" }}
              onClick={() => handleFavorite(animal)}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Animal;
