# meetApp

meetApp is a serverless, progressive web application developed using React, following a test-driven development approach. The application seamlessly integrates with the Google Calendar API to retrieve upcoming events, offering users options to filter events by city and providing interactive event visualizations.

The app is currently deployed on [deployed on GitHub Pages](https://katgaertner.github.io/meetApp/).  

## Features

- Fetches events from Google Calendar API to provide up-to-date event information.
- Presents events in a comprehensive overview list, where each entry can be expanded to reveal detailed information.
- Allows filtering events by city and adjusting the number of displayed events.
- Visualizes event details for enhanced user experience.
- Progressive Web App (PWA): Download and use the app offline with locally saved data.

## Screenshots
<a href="https://github.com/KatGaertner/meetApp/blob/main/screenshots/mobile1.jpeg">
<img src="https://github.com/KatGaertner/meetApp/blob/main/screenshots/mobile1.jpeg?raw=true" alt="Mobile screenshot" height="200px"/></a>
<a href="https://github.com/KatGaertner/meetApp/blob/main/screenshots/mobile2.jpeg">
<img src="https://github.com/KatGaertner/meetApp/blob/main/screenshots/mobile2.jpeg?raw=true" alt="Mobile screenshot" height="200px"/></a>
<a href="https://github.com/KatGaertner/meetApp/blob/main/screenshots/desktop.png">
<img src="https://github.com/KatGaertner/meetApp/blob/main/screenshots/desktop.png?raw=true" alt="Desktop screenshot" height="200px"/></a>

## Technologies

This project utilizes:

- [create-react-app](https://github.com/facebook/create-react-app): A library for building React applications with modern tooling setups.
- [testing-library](https://testing-library.com/): Used for test-driven development and ensuring application reliability.
- Serverless architecture: Utilizes AWS Lambda functions for efficient backend operations.
- Google OAuth2: Enables secure and convenient user authentication.
- PWA manifest + service worker: Ensures an engaging and responsive user experience, even when offline.
- [Atatus](https://www.atatus.com/): Monitors app performance and tracks errors for better stability.
- [Recharts](https://recharts.org/): A charting library for creating dynamic and interactive visualizations.

## To Do

- The accessibility of the app needs improvement to ensure inclusivity for all users.

## Project Status

This project was made within the scope of a web development course as a portfolio project. As such, it is finished for now.