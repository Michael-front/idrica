import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./Filter";

const onDataFilteredMock = jest.fn();
const mockData = [
  {
    id: "1",
    title: "Title post 1",
  },
  {
    id: "2",
    title: "Title post 2",
  },
];

describe("Filter component Test", () => {
  it("checks data is filtered by title 'Title post 1' correclty", () => {
    render(<Filter data={mockData} placeHoder='SEARCH...' byFields={["title"]} onDataFiltered={onDataFilteredMock} />);

    const inputElement = screen.getByPlaceholderText("SEARCH...");
    fireEvent.change(inputElement, { target: { value: "Title post 1" } });

    expect(inputElement).toBeInTheDocument();
    expect(onDataFilteredMock).toHaveBeenCalledWith([
      {
        id: "1",
        title: "Title post 1",
      },
    ]);
  });

  it("checks that filter is empty if there are not matches", () => {
    render(<Filter data={mockData} placeHoder='SEARCH...' byFields={["title"]} onDataFiltered={onDataFilteredMock} />);

    const inputElement = screen.getByPlaceholderText("SEARCH...");
    fireEvent.change(inputElement, { target: { value: "Other" } });

    expect(inputElement).toBeInTheDocument();
    expect(onDataFilteredMock).toHaveBeenCalledWith([]);
  });
});
