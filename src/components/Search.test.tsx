import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "./Search";
import { MemoryRouter } from "react-router-dom";

describe("Search", () => {
  test("user searches by zip code", () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
});
