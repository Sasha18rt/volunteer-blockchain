import React from "react";
import { EthProvider } from "./contexts/EthContext";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";

const App = () => {
  return (
    <EthProvider>
      <div>
        <h1>Volunteer Management</h1>
        <CreateEvent />
        <EventList />
      </div>
    </EthProvider>
  );
};

export default App;
