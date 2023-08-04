import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent, numberBox;

  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
    // spinbutton refers to any <input type="number">
    numberBox = NumberOfEventsComponent.queryByRole("spinbutton");
  });

  test("renders number input", () => {
    expect(numberBox).toBeInTheDocument();
  });

  test("has a default value of 32", () => {
    expect(numberBox.value).toEqual("32");
  });

  test("changes value when user types in it", async () => {
    const user = userEvent.setup();
    await user.type(numberBox, "{backspace}{backspace}10");
    expect(numberBox.value).toEqual("10");
  });
});
