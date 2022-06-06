import React, { useState } from "react";

const PaginateTestCars = ({
  cars,
  itemIndex
}: {
  cars: any;
  itemIndex: any;
}) => {
  return (
    <>
      {cars.map((car: any, index: number) => {
        debugger;
        if (index === itemIndex) {
          return car;
        }
      })}
    </>
  );
};

export default PaginateTestCars;
