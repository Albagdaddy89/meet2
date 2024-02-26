import { render, fireEvent, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent, setNumberOfEvents, setErrorAlert;

  beforeEach(() => {
    setNumberOfEvents = jest.fn();
    setErrorAlert = jest.fn();
    NumberOfEventsComponent = render(
      <NumberOfEvents
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlert}
      />
    );
  });

  test('has an element with "textbox" role', () => {
    expect(
      getByRole(NumberOfEventsComponent.container, "textbox")
    ).toBeInTheDocument();
  });

  test("default value is 32", () => {
    expect(getByRole(NumberOfEventsComponent.container, "textbox")).toHaveValue(
      "32"
    );
  });

  test("value of number of events updates correctly when user types in textbox", async () => {
    const numberOfEventsInput = getByRole(
      NumberOfEventsComponent.container,
      "textbox"
    );
    fireEvent.change(numberOfEventsInput, { target: { value: "10" } });
    expect(numberOfEventsInput).toHaveValue("10");
  });
});
