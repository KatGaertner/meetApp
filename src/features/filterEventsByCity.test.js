import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("that the user has not searched for a city", () => {});

    let AppComponent;

    when("the user opens the app", () => {
      AppComponent = render(<App />);
    });

    then("show upcoming events from all cities", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    const city = "Berlin";
    let AppComponent;
    given("the main page is open", () => {
      AppComponent = render(<App />);
    });
    let CitySearchDOM;
    when("the user starts typing in the city box", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, city);
    });

    then("a list of matching cities is suggested", async () => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    const city = "Berlin";

    given("the user has typed in the city box", async () => {
      const user = userEvent.setup();
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, city);
    });

    let suggestionListItems;

    and("a list of suggested cities is shown", () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    let suggestedCity;

    when("the user selects a suggestion", async () => {
      const user = userEvent.setup();
      suggestedCity = suggestionListItems[0];
      await user.click(suggestedCity);
    });

    then("that city as set as the user’s city", () => {
      expect(citySearchInput).toHaveValue(suggestedCity.textContent);
    });

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = AppDOM.querySelector("#event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        expect(EventListItems).toHaveLength(berlinEvents.length);
      }
    );
  });
});
