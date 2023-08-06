import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    let EventListDOM;
    given("a list of events is shown to the user", () => {
      const AppComponent = render(<App />);
      EventListDOM =
        AppComponent.container.firstChild.querySelector("#event-list");
    });

    when("the user hasn’t specified a number", () => {});

    then("a maximum of 32 event elements are shown", async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    let AppDOM, EventListDOM;
    const number = 10;
    given("a list of events is shown to the user", () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
    });

    when("the user changes the number in the event number box", async () => {
      const user = userEvent.setup();
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      const NumberOfEventsInput =
        within(NumberOfEventsDOM).queryByRole("spinbutton");

      await user.type(NumberOfEventsInput, `{backspace}{backspace}${number}`);
    });

    then(
      "the number of events that the user specified will be displayed as a maximum",
      () => {
        const allRenderedEventItems =
          within(EventListDOM).queryAllByRole("listitem");
        expect(allRenderedEventItems.length).toBe(number);
      }
    );
  });
});
