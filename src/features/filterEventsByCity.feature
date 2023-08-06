Feature: Filter events by city
    Scenario: When user hasn’t searched for a city, show upcoming events from all cities.
        Given that the user has not searched for a city
        When the user opens the app
        Then show upcoming events from all cities

    Scenario: User should see a list of suggestions when they search for a city.
        Given the main page is open
        When the user starts typing in the city box
        Then a list of matching cities is suggested
    Scenario: User can select a city from the suggested list.
        Given the user has typed in the city box
        And a list of suggested cities is shown
        When the user selects a suggestion
        Then that city as set as the user’s city
        And the user should receive a list of upcoming events in that city