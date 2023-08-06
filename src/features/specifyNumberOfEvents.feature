Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given a list of events is shown to the user
        When the user hasn’t specified a number
        Then a maximum of 32 event elements are shown
    Scenario: User can change the number of events displayed.
        Given a list of events is shown to the user
        When the user changes the number in the event number box
        Then the number of events that the user specified will be displayed as a maximum