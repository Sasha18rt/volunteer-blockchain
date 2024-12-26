import React, { useState } from "react";
import { useEth } from "../contexts/EthContext";

const CreateEvent = () => {
  const { contract, accounts } = useEth();
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    maxVolunteers: "",
    eventType: "", 
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, location, date, maxVolunteers, eventType } = form;
      const unixDate = Math.floor(new Date(date).getTime() / 1000);

      await contract.methods
        .createEvent(name, location, unixDate, maxVolunteers, eventType)
        .send({ from: accounts[0] });

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Max Volunteers:</label>
          <input
            type="number"
            name="maxVolunteers"
            value={form.maxVolunteers}
            onChange={handleChange}
            placeholder="Enter maximum number"
            required
          />
        </div>
        <div className="form-group">
          <label>Event Type:</label>
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an event type
            </option>
            <option value="Ecology">Ecology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Community">Community</option>
          </select>
        </div>
        <button className="submit-button" type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
