import puppeteer from "puppeteer";
import { getEvents } from "../api";

const options = {
  //   headless: false,
  //   slowMo: 250,
  //   timeout: 0,
};

describe("filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(options);
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("When user hasn’t searched for a city, show upcoming events from all cities", async () => {
    const EventListItems = await page.$$(".event");
    expect(EventListItems.length).toBe(32);
  });

  test("User should see a list of suggestions when they search for a city.", async () => {
    const city = "Berlin";
    await page.type("#city-search input", city);
    const suggestionListItems = await page.$$("#city-search li");
    expect(suggestionListItems.length).toBe(2);
  });

  test("User can select a city from the suggested list.", async () => {
    // const city = "Berlin";
    // await page.type("#city-search input", city);
    // these are not executed again here because of the test before
    // --- keep in mind if this test needs to run alone ---

    const suggestedCity = await page.$eval(
      "#city-search li",
      (el) => el.textContent
    );
    await page.click("#city-search li");
    const inputValue = await page.$eval("#city-search input", (el) => el.value);
    expect(inputValue).toBe(suggestedCity);

    const EventListItems = await page.$$(".event");
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === suggestedCity
    );
    expect(EventListItems.length).toBe(berlinEvents.length);
  });
});

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(options);
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .description");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .description");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .description");
    expect(eventDetails).toBeNull();
  });
});
