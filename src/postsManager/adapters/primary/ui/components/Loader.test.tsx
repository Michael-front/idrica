import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

const renderLoader = (isLoading: boolean) => {
  return render(<Loader isLoading={isLoading} />);
};

describe("Header component", () => {
  it("should render effect for loading", () => {
    const { getByTestId } = renderLoader(true);
    const loader = getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("should not render effect for loading", () => {
    const { container } = renderLoader(false);

    expect(container.firstChild).toBeNull();
  });
});
