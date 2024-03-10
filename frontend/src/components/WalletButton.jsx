import React, { useState, useEffect } from "react";
import { IoMdExit } from "react-icons/io";

const WalletButton = ({
  buttonName = "Connect Wallet",
  buttonColor = "bg-blue-500",
  showWalletAddress = true,
}) => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
        console.log("Wallet connected:", accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };
  const disconnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // Requesting accounts with eth_accounts to trigger the disconnect
        await window.ethereum.request({ method: "eth_accounts" });
        setWalletAddress("");
        console.log("Wallet disconnected");
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setWalletAddress("");
      console.log("Wallet disconnected");
    } else {
      setWalletAddress(accounts[0]);
      console.log("Wallet connected:", accounts[0]);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Wallet connected:", accounts[0]);
        } else {
          console.log("No accounts available.");
        }
      });
    }

    return () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  return (
    <>
      <button
        className={`text-white py-2 px-4 rounded  mx-5 ${buttonColor}`}
        onClick={connectWallet}
      >
        {walletAddress && showWalletAddress
          ? `Connected:  ${walletAddress.substring(
              0,
              6
            )}...${walletAddress.substring(38)}`
          : buttonName}
      </button>
      {walletAddress && (
        <button
          className="text-white py-2 rounded mx-1 bg-black"
          onClick={disconnectWallet}
        >
          <IoMdExit />
        </button>
      )}
    </>
  );
};

export default WalletButton;

// Dynamic Wallet
// import {
//   DynamicContextProvider,
//   DynamicWidget,
// } from "@dynamic-labs/sdk-react-core";
// import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

// import React from "react";

// const WalletButton = () => {
//   return (
//     <DynamicContextProvider
//       settings={{
//         environmentId: "daa53108-7e85-4cc3-aabf-4032b12f4bd9",
//         walletConnectors: [EthereumWalletConnectors],
//       }}
//     >
//       <DynamicWidget />
//     </DynamicContextProvider>
//   );
// };

// export default WalletButton;
