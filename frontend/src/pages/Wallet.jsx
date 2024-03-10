
import WalletButton from '../components/WalletButton'

const Wallet = () => {
  return (
    <WalletButton buttonName="Connect Wallet" />
  )
}

export default Wallet

// *************Dynamic Wallet Kit**************************


// import {
//   DynamicContextProvider,
//   DynamicWidget,
// } from "@dynamic-labs/sdk-react-core";
// import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// const Wallet = () => {
//   return (

//     <>
//       <DynamicContextProvider
//         settings={{
//           // Find your environment id at https://app.dynamic.xyz/dashboard/developer
//           environmentId: "785961a9-305f-46de-80a6-5c9c7224bd30",
//           walletConnectors: [EthereumWalletConnectors],
//         }}
//       >
//         <DynamicWidget />
//       </DynamicContextProvider>
//     </>
//   );

// }

// export default Wallet

// *************RainbowKit Wallet Kit**************************

// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   getDefaultWallets,
//   RainbowKitProvider, darkTheme
// } from '@rainbow-me/rainbowkit';
// import { configureChains, createConfig, WagmiConfig } from 'wagmi';
// import {
//   mainnet,
// } from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';
// import { ConnectButton } from '@rainbow-me/rainbowkit';

// const { chains, publicClient } = configureChains(
//   [mainnet],
//   [
//     alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
//     publicProvider()
//   ]
// );
// const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains
// });
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient
// })

// const Wallet = () => {
//   return (
//     <WagmiConfig config={wagmiConfig}>
//       <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
//         <div className="flex justify-center mt-20" >
//           <ConnectButton showBalance={{
//             smallScreen: false,
//             largeScreen: true,
//           }} accountStatus={{
//             smallScreen: 'avatar',
//             largeScreen: 'full',
//           }} />
//         </div>
//       </RainbowKitProvider>
//     </WagmiConfig>
//   );
// };
// export default Wallet

