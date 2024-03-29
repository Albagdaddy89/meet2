// src/__tests__/App.test.js

import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  let appDom;
  beforeEach(() => {
    appDom = render(<App />).container.firstChild;
  });
  test("renders list of events", () => {
    expect(appDom.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(appDom.querySelector("#city-search")).toBeInTheDocument();
  });

  test("render NumberOfEvents", () => {
    expect(appDom.querySelector("#numberOfEvents")).toBeInTheDocument();
  });
});
