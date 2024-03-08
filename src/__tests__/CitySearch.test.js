import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });
  test("suggestion list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a suggestion list when city box is clicked", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");

    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestion");
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("updates suggestion list correctly when user types in textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );
    // User types 'Berlin' in textbox
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Extract suggestion list according to textbox value
    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );

    // Get suggestion list returned from CitySearch component
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");

    // Compare extracted suggestion list with the result from CitySearch Component
    expect(suggestionListItems.length).toBe(suggestions.length + 1); // +1 for the 'See all cities' option
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index]).toHaveTextContent(suggestion);
    });
  });

  test("renders suggestion text in the textbox upon clicking suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Suggestion content for location will be 'Berlin, Germany'
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    const user = userEvent.setup();
    // Render the App component instead of CitySearch to test integration
    const AppComponent = render(<App />);

    // Find the city text box within the rendered App using the specific placeholder text
    const cityTextBox = within(AppComponent.container).getByPlaceholderText(
      "Search for a city"
    );

    // Simulate user clicking on the city text box
    await user.click(cityTextBox);

    // Wait for and fetch all events to determine expected suggestions
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents); // Extract unique locations from events
    console.log(allLocations);
    // Now check if the suggestions list appeared
    const suggestions = within(AppComponent.container).queryAllByRole(
      "listitem"
    );

    // Check if the suggestions length matches all unique locations + 1 for 'See all cities'
    expect(suggestions.length).toBe(allLocations.length + 1);
  });
});
