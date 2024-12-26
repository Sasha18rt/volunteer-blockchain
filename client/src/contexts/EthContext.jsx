import React, { createContext, useContext, useReducer, useEffect } from "react";
import Web3 from "web3";
import VolunteerEvents from "../contracts/VolunteerEvents.json";

const EthContext = createContext();

export const useEth = () => useContext(EthContext);

const initialState = {
  web3: null,
  accounts: null,
  contract: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        ...action.data,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export const EthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VolunteerEvents.networks[networkId];
        const contract = new web3.eth.Contract(
          VolunteerEvents.abi,
          deployedNetwork && deployedNetwork.address
        );

        dispatch({
          type: "init",
          data: { web3, accounts, contract },
        });
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
      }
    };

    init();
  }, []);

  const registerVolunteer = async (eventId) => {
    try {
      if (!state.contract) {
        throw new Error("Contract is not initialized.");
      }

      await state.contract.methods
        .registerVolunteer(eventId)
        .send({ from: state.accounts[0] });

      alert("Successfully registered as a volunteer!");
    } catch (error) {
      console.error("Error registering volunteer:", error);
      alert("Failed to register as a volunteer. Please try again.");
    }
  };

  return (
    <EthContext.Provider value={{ ...state, dispatch, registerVolunteer }}>
      {children}
    </EthContext.Provider>
  );
};

export default EthContext;
