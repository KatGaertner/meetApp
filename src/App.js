import { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import { getEvents, extractLocations } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [allEvents, setAllEvents] = useState([]);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert(
        "No internet connection. Showing offline data, events might not me up-to-date."
      );
    }
    const data = await getEvents();
    if (data) {
      setAllEvents(data);
    }
  };

  const setData = async () => {
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData();
  }, [currentCity, currentNOE, allEvents]);

  return (
    <div className="app">
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <div className="alerts-container">
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;
