
pragma solidity ^0.8.0;

contract VolunteerEvents {
    struct Event {
        string name;
        string location;
        uint256 date;
        uint256 maxVolunteers;
        address[] volunteers;
        string eventType; 
        uint256 donations; 
        address creator; 
        mapping(address => bool) isRegistered; 
    }

    Event[] private events;

    // Function to create a new event
    function createEvent(
        string memory _name,
        string memory _location,
        uint256 _date,
        uint256 _maxVolunteers,
        string memory _eventType 
    ) public {
        Event storage newEvent = events.push();
        newEvent.name = _name;
        newEvent.location = _location;
        newEvent.date = _date;
        newEvent.maxVolunteers = _maxVolunteers;
        newEvent.eventType = _eventType;
        newEvent.donations = 0;
        newEvent.creator = msg.sender;
    }

    // Function to donate to an event
    function donateToEvent(uint256 eventId) public payable {
        require(eventId < events.length, "Event does not exist.");
        require(msg.value > 0, "Donation amount must be greater than 0.");
        events[eventId].donations += msg.value;
    }

    // Function to register a volunteer for an event
    function registerVolunteer(uint256 eventId) public {
        require(eventId < events.length, "Event does not exist.");
        Event storage selectedEvent = events[eventId];

        require(!selectedEvent.isRegistered[msg.sender], "Already registered.");
        require(
            selectedEvent.volunteers.length < selectedEvent.maxVolunteers,
            "Event is full."
        );

        selectedEvent.volunteers.push(msg.sender);
        selectedEvent.isRegistered[msg.sender] = true;
    }

    // Function to get details of an event
    function getEvent(uint256 _eventId)
        public
        view
        returns (
            string memory name,
            string memory location,
            uint256 date,
            uint256 maxVolunteers,
            address[] memory volunteers,
            string memory eventType,
            uint256 donations, 
            address creator 
        )
    {
        require(_eventId < events.length, "Event does not exist.");
        Event storage eventDetails = events[_eventId];
        return (
            eventDetails.name,
            eventDetails.location,
            eventDetails.date,
            eventDetails.maxVolunteers,
            eventDetails.volunteers,
            eventDetails.eventType,
            eventDetails.donations,
            eventDetails.creator
        );
    }

    // Function to get the total number of events
    function getEventsLength() public view returns (uint256) {
        return events.length;
    }

    // Function to withdraw funds from the contract
    function withdrawFunds(uint256 eventId) public {
        require(eventId < events.length, "Event does not exist.");
        Event storage eventDetails = events[eventId];
        
        // Only the creator of the event can withdraw
        require(msg.sender == eventDetails.creator, "Only the event creator can withdraw funds.");
        
        uint256 amount = eventDetails.donations;
        require(amount > 0, "No funds to withdraw.");
        
        eventDetails.donations = 0; 
        payable(msg.sender).transfer(amount); // Transfer funds to the event creator
    }
}
