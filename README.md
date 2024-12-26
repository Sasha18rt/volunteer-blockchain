# Volunteer Events Blockchain Project

This project is a decentralized application (DApp) for organizing and managing volunteer events using blockchain technology. It allows event organizers to create events, manage volunteer registrations, and accept donations with full transparency.

## Features

- **Event Creation:** Organizers can create events with details such as name, location, date, maximum number of volunteers, and event type.
- **Volunteer Registration:** Users can register as volunteers for events if slots are available.
- **Donations:** Users can donate Ether to events, with the funds being withdrawable by the event creator.
- **Transparency:** All transactions and registrations are stored on the blockchain, ensuring trust and immutability.

## Prerequisites

1. **Node.js and npm:** Install Node.js (https://nodejs.org/).
2. **Truffle Suite:** Install Truffle for blockchain development.
   ```bash
   npm install -g truffle
   ```
3. **Ganache:** Install Ganache for running a local Ethereum blockchain.
   ```bash
   npm install -g ganache-cli
   ```
4. **Metamask:** Install the Metamask extension for your browser.

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <your-gitlab-repository-url>
cd blockchain-volunteer
```

### 2. Install Dependencies
Navigate to both the `truffle` and `client` directories and install dependencies:
```bash
cd truffle
npm install

cd ../client
npm install
```

### 3. Start Ganache
Run Ganache to simulate a local Ethereum blockchain:
```bash
ganache-cli
```

### 4. Deploy Smart Contract
Deploy the smart contract to the local blockchain:
```bash
cd truffle
truffle migrate
```

### 5. Start the Frontend
Start the React frontend to interact with the blockchain:
```bash
cd ../client
npm start
```

The application will be available at `http://localhost:3000`.

## Smart Contract Overview

The smart contract (`VolunteerEvents.sol`) includes the following functions:

- **createEvent:** Create a new event with specified details.
- **registerVolunteer:** Register a user as a volunteer for an event.
- **donateToEvent:** Donate Ether to an event.
- **withdrawFunds:** Allow the event creator to withdraw collected donations.
- **getEvent:** Retrieve details of a specific event.
- **getEventsLength:** Get the total number of events.

## Project Structure

```
blockchain-volunteer
├── truffle/                  # Smart contract and blockchain configuration
│   ├── contracts/           # Solidity smart contracts
│   ├── migrations/          # Deployment scripts
│   ├── test/                # Contract tests
│   └── truffle-config.js    # Truffle configuration file
├── client/                   # Frontend application
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
└── README.md                # Project documentation
```

## How to Use

1. **Create an Event:** Fill out the event creation form on the homepage and click "Create Event."
2. **Register as a Volunteer:** View the list of events and click "Register as Volunteer" on an event with available slots.
3. **Donate:** Enter the donation amount in Ether and click "Donate."
4. **Withdraw Funds:** If you are the event creator, click "Withdraw Funds" to withdraw donations.

## Technologies Used

- **Frontend:** React
- **Blockchain:** Solidity, Truffle
- **Local Blockchain:** Ganache
- **Web3:** For blockchain interaction

## Future Enhancements

- Integration with a public blockchain like Ethereum Mainnet.
- Enhanced UI for better user experience.
- Additional features like event updates and notifications.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contribution

Feel free to contribute to this project by forking the repository, making changes, and submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

### Author
This project was created as a decentralized solution for managing volunteer events transparently. If you have any questions or suggestions, feel free to contact me.
