import React, { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import Web3 from "web3";

const EventList = () => {
  const { contract, accounts, registerVolunteer } = useEth();
  const [events, setEvents] = useState([]);
  const [donationAmount, setDonationAmount] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!contract || !contract.methods) {
          console.warn("Contract is not initialized yet.");
          return;
        }

        const eventsLength = await contract.methods.getEventsLength().call();
        const fetchedEvents = [];

        for (let i = 0; i < eventsLength; i++) {
          const event = await contract.methods.getEvent(i).call();
          fetchedEvents.push({
            name: event[0],
            location: event[1],
            date: new Date(event[2] * 1000).toLocaleDateString(),
            maxVolunteers: event[3],
            volunteers: event[4],
            eventType: event[5] || "General",
            totalDonations: Web3.utils.fromWei(event[6] || "0", "ether"),
            creator: event[7], 
          });
        }

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (contract) fetchEvents();
  }, [contract]);

  const handleRegister = async (eventId) => {
    try {
      const event = events[eventId];
      if (event.volunteers.length >= event.maxVolunteers) {
        alert("Event is full.");
        return;
      }

      await registerVolunteer(eventId);

      setEvents((prevEvents) =>
        prevEvents.map((e, index) =>
          index === eventId
            ? { ...e, volunteers: [...e.volunteers, accounts[0]] }
            : e
        )
      );

      alert("Successfully registered as a volunteer!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register as a volunteer. Please try again.");
    }
  };

  const handleDonate = async (eventId) => {
    try {
      const amount = donationAmount[eventId];
      if (!amount || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      await contract.methods.donateToEvent(eventId).send({
        from: accounts[0],
        value: Web3.utils.toWei(amount.toString(), "ether"),
      });

      alert("Thank you for your donation!");

      const updatedEvent = await contract.methods.getEvent(eventId).call();
      setEvents((prevEvents) =>
        prevEvents.map((e, index) =>
          index === eventId
            ? {
                ...e,
                totalDonations: Web3.utils.fromWei(updatedEvent[6], "ether"),
              }
            : e
        )
      );

      setDonationAmount((prev) => ({ ...prev, [eventId]: "" }));
    } catch (error) {
      console.error("Error during donation:", error);
      alert("Failed to process the donation. Please try again.");
    }
  };

  const handleWithdraw = async (eventId) => {
    try {
      await contract.methods.withdrawFunds(eventId).send({
        from: accounts[0],
      });

      alert("Funds withdrawn successfully!");

      const updatedEvent = await contract.methods.getEvent(eventId).call();
      setEvents((prevEvents) =>
        prevEvents.map((e, index) =>
          index === eventId
            ? {
                ...e,
                totalDonations: Web3.utils.fromWei(updatedEvent[6], "ether"),
              }
            : e
        )
      );
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      alert("Failed to withdraw funds. Please try again.");
    }
  };

  const handleDonationChange = (e, eventId) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    setDonationAmount((prev) => ({ ...prev, [eventId]: value }));
  };

  return (
    <div>
      <h2>Event List</h2>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div className="event-card" key={index}>
            <h3>{event.name}</h3>
            <p>Type: {event.eventType}</p>
            <p>Location: {event.location}</p>
            <p>Date: {event.date}</p>
            <p>Max Volunteers: {event.maxVolunteers}</p>
            <p>Volunteers Registered: {event.volunteers.length}</p>
            <p>Total Donations: {event.totalDonations} ETH</p>
            {event.creator.toLowerCase() === accounts[0].toLowerCase() ? (
              <button onClick={() => handleWithdraw(index)}>Withdraw Funds</button>
            ) : (
              <>
                <button
                  onClick={() => handleRegister(index)}
                  disabled={event.volunteers.length >= event.maxVolunteers}
                >
                  {event.volunteers.length >= event.maxVolunteers
                    ? "Event Full"
                    : "Register as Volunteer"}
                </button>
                <div className="donation-section">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter donation in ETH"
                    value={donationAmount[index] || ""}
                    onChange={(e) => handleDonationChange(e, index)}
                  />
                  <button
                    onClick={() => handleDonate(index)}
                    disabled={!donationAmount[index] || donationAmount[index] <= 0}
                  >
                    Donate
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventList;
