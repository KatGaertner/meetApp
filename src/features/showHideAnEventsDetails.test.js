import { loadFeature, defineFeature } from "jest-cucumber";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let EventComponent;

    given("a list of events is shown to the user", async () => {
      const allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    when("the events are first displayed", () => {});

    then("every event element is collapsed", () => {
      expect(
        EventComponent.container.firstChild.querySelector(".description")
      ).not.toBeInTheDocument();
    });
  });

  test("User can expand an event to see details.", ({ given, when, then }) => {
    let EventComponent;

    given("a collapsed event element", async () => {
      const allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    when("the user clicks on a “show details” button", async () => {
      const user = userEvent.setup();
      const showButton = EventComponent.queryByText("show details");
      await user.click(showButton);
    });

    then("the element expands and shows more information", () => {
      expect(
        EventComponent.container.firstChild.querySelector(".description")
      ).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    const user = userEvent.setup();
    let EventComponent;

    given("an expanded event element", async () => {
      const allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const showButton = EventComponent.queryByText("show details");
      await user.click(showButton);
    });

    when("the user clicks on a “hide details” button", async () => {
      const hideButton = EventComponent.queryByText("hide details");
      await user.click(hideButton);
    });

    then("the event element collapses", () => {
      expect(
        EventComponent.container.firstChild.querySelector(".description")
      ).not.toBeInTheDocument();
    });
  });
});
