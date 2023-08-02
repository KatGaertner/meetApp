# meetApp

The meetApp is going to be a serverless, progressive web application developed with React, employing a test-driven development approach. The primary objective of this project is to create a dynamic application that utilizes the Google Calendar API to fetch upcoming events.

## Features, User Stories & Scenarios

### Feature 1: Filter Events By City
As a **user**  
I should be able to **filter all events by city**  
So that **I can find an event near me.**  

**Scenario 1**: When user hasn’t searched for a city, show upcoming events from all cities.  
Given that the user has not searched for a city  
When the user opens the app  
Then show upcoming events from all cities

**Scenario 2**: User should see a list of suggestions when they search for a city.  
Given the main page is open  
When the user starts typing in the city box  
Then a list of matching cities is suggested

**Scenario 3**: User can select a city from the suggested list.  
Given the user has typed in the city box and a list of suggested cities is shown  
When the user selects a suggestion  
Then that city as set as the user’s city

### Feature 2: Show/Hide Event Details
As a **user**  
I should be able to **show or hide the details to an event**  
So that **I see an overview of all events quickly and can also see the details of those that interest me.**  

**Scenario 1**: An event element is collapsed by default.  
Given a list of events is shown to the user  
When the events are first displayed  
Then every event element is collapsed

**Scenario 2**: User can expand an event to see details.  
Given a collapsed event element  
When the user clicks on a “show details” button  
Then the element expands and shows more information

**Scenario 3**: User can collapse an event to hide details.  
Given an expanded event element  
When the user clicks on a “hide details” button  
Then the event element collapses

### Feature 3: Specify Number of Events
As a **user**  
I should be able to **change the number of events I see**  
So that **I can see more events if I prefer.**  


**Scenario 1**: When user hasn’t specified a number, 32 events are shown by default.  
Given a list of events is shown to the user  
When the user hasn’t specified a number  
Then a maximum of 32 event elements are shown

**Scenario 2**: User can change the number of events displayed.  
Given a list of events is shown to the user  
When the user changes the number in the event number box  
Then the number of events that the user specified will be displayed as a maximum

### Feature 4: Use the App When Offline
As a **user**  
I should be able to **see cached information in the app when I am offline**  
So that **I can find the event details even when I have no internet.**  

**Scenario 1**: Show cached data when there’s no internet connection.  
Given the app is used and there is no internet connection  
When a user views any data  
Then cached data will be displayed

**Scenario 2**: Show error when user changes search settings (city, number of events).  
Given the app is used and there is no internet connection  
When the user changes the city or the number of events  
Then an error is displayed

### Feature 5: Add an App Shortcut to the Home Screen
As a **user**  
I should be able to **add a shortcut of the app to my home screen**  
So that I can have quick access to it.  

**Scenario 1**: User can install the meet app as a shortcut on their device home screen.  
Given the app is open  
When the user clicks on a “add to home screen” button  
Then a shortcut to the app will be created on the user’s home screen

### Feature 6: Display Charts Visualizing Event Details
As a **user**  
I should be able to **see a visualisation of all events**  
So that **I can see which topics and cities near me are interesting.**  

**Scenario 1**: Show a chart with the number of upcoming events in each city.  
Given the user has not entered a city to search for  
When the user clicks on a “visualization” button  
Then graphs comparing the types and numbers of events in each city will be shown to the user


## Utilizing serverless functions

This application harnesses the capabilities of serverless functions to efficiently handle all its essential tasks, such as interaction with the Google Calendar API, event filtering (by city or by how many to display) and visualization.

With serverless architecture, there is no need for a dedicated server to run continuously, ensuring optimal resource allocation. It enables the app to operate on-demand, activating the necessary functions precisely when required, thus reducing unnecessary overhead. If the app experiences fluctuations in user demand, serverless functions automatically adjust to the workload, seamlessly accommodating higher traffic without any manual intervention.

Furthermore, with serverless computing, updates and maintenance are taken care of by the cloud provider, allowing to focus on providing an exceptional and reliable application with sound business logic.