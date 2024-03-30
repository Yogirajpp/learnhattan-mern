import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnectButton = () => {
  return (
    <div className="px-5 m-1 flex">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div style={{ width: "100%" }}>
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="w-full bg-purple-600 font-medium text-white rounded-3xl text-sm py-2 px-4 text-center mr-2 mb-2"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WalletConnectButton;
