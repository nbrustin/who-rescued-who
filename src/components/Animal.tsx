import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fallbackImageDog from "../Assets/no-image-found-dog.png";
import fallbackImageCat from "../Assets/no-image-found-cat.gif";

interface Props {
  animal: any;
}

const Animal = ({ animal }: { animal: any }) => {
  const objectFitStyle = animal.photos.length !== 0 ? "cover" : "contain";
  const fallBackImageAnimal =
    animal.type.toLowerCase() === "dog" ? fallbackImageDog : fallbackImageCat;
  return (
    <Col md={3} key={animal.id} className="my-4">
      <Card
        onClick={() => window.open(animal.url, "_blank")}
        className="h-100"
        style={{ borderRadius: "8px", cursor: "pointer" }}
      >
        <Card.Img
          style={{
            height: "40vh",
            objectFit: objectFitStyle,
            width: "100%"
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
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Animal;
