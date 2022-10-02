import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import fallbackImageDog from "../Assets/no-image-found-dog.png";
import fallbackImageCat from "../Assets/no-image-found-cat.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
import styles from "./animal.module.css";

const Animal = ({
  animal,
  favoritesIdArray,
}: {
  animal: any;
  favoritesIdArray: any;
}) => {
  const [favorite, setFavorite] = useState(
    favoritesIdArray?.includes(animal.id)
  );
  const handleFavorite = (animal: any) => {
    const animalFavorites = JSON.parse(
      sessionStorage.getItem("ANIMAL_FAVORITES") || "[]"
    );
    if (favorite) {
      const newAnimalFavorites = animalFavorites.filter(
        (favorite: any) => favorite.id !== animal.id
      );
      sessionStorage.setItem(
        "ANIMAL_FAVORITES",
        JSON.stringify(newAnimalFavorites)
      );
    } else {
      const newAnimalFavorites: any[] = [...animalFavorites, animal];
      sessionStorage.setItem(
        "ANIMAL_FAVORITES",
        JSON.stringify(newAnimalFavorites)
      );
    }
    setFavorite(!favorite);
  };

  const objectFitStyle = animal?.photos?.length !== 0 ? "cover" : "contain";
  const fallBackImageAnimal =
    animal?.type?.toLowerCase() === "dog" ? fallbackImageDog : fallbackImageCat;
  return (
    <Col sm={6} md={4} lg={3} key={animal.id} className="my-4">
      <Card className="h-100" style={{ borderRadius: "8px" }}>
        <Card.Img
          onClick={() => window.open(animal.url, "_blank")}
          className={styles.image}
          style={{ objectFit: objectFitStyle }}
          variant="top"
          src={
            animal?.photos?.length !== 0
              ? animal?.photos[0].large
              : fallBackImageAnimal
          }
        />
        <Card.Body>
          <Card.Title className={`text-center my-4 ${styles.title}`}>
            {animal.name}
          </Card.Title>
          <div className="row">
            <Card.Text className="col-lg-6">{animal.age}</Card.Text>
            <Card.Text className="col-lg-6">{animal.breeds.primary}</Card.Text>
          </div>
          <div className={animal.distance !== null ? "row" : "d-none"}>
            <Card.Text className="col mb-2 text-center">
              {Math.round(animal.distance)} miles away
            </Card.Text>
          </div>
          <div className="row">
            <div className="col">
              <FontAwesomeIcon
                icon={favorite === true ? heartSolid : heartOutline}
                style={{ color: "red" }}
                onClick={() => handleFavorite(animal)}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Animal;
