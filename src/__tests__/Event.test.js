import { render } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
  let EventComponent, allEvents, descriptionRegEx;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
    //using a part of the description's string as a regex because the description is multiline
    descriptionRegEx = /Have you wondered how you can/;
  });

  test("renders event title", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event time", () => {
    expect(
      EventComponent.queryByText(allEvents[0].start.dateTime)
    ).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with 'show details'", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  test("by default, details section should be hidden", () => {
    expect(
      EventComponent.queryByText(descriptionRegEx)
    ).not.toBeInTheDocument();
  });

  test("on expanded details, renders a button with 'hide details' instead of 'show more'", async () => {
    const user = userEvent.setup();
    const showButton = EventComponent.queryByText("show details");
    await user.click(showButton);
    expect(EventComponent.queryByText("hide details")).toBeInTheDocument();
    expect(EventComponent.queryByText("show details")).not.toBeInTheDocument();
  });

  test("shows details on a click to 'show details'", async () => {
    const user = userEvent.setup();
    const showButton = EventComponent.queryByText("show details");
    await user.click(showButton);
    expect(EventComponent.queryByText(descriptionRegEx)).toBeInTheDocument();
  });

  test("hides details on a click to 'hide details'", async () => {
    const user = userEvent.setup();
    const hideButton = EventComponent.queryByText("hide details");
    await user.click(hideButton);
    expect(
      EventComponent.queryByText(descriptionRegEx)
    ).not.toBeInTheDocument();
  });
});
