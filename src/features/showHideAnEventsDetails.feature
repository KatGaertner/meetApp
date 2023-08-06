Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given a list of events is shown to the user
        When the events are first displayed
        Then every event element is collapsed

    Scenario: User can expand an event to see details.
        Given a collapsed event element
        When the user clicks on a “show details” button
        Then the element expands and shows more information

    Scenario: User can collapse an event to hide details.
        Given an expanded event element
        When the user clicks on a “hide details” button
        Then the event element collapses