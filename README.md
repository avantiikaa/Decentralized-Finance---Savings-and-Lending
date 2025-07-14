# DeFi Savings and Lending Platform

This project demonstrates decentralized finance savings and lending using:

- Solidity Smart Contracts
- React.js Frontend with Web3.js
- MetaMask Wallet Integration

## How to Run

1. Start Ganache and deploy:
truffle migrate

2. Copy the ABI from `build/contracts/Lending.json` to `frontend/src/LendingABI.json`.

3. In `frontend`, run:
npm install
npm start


4. Open `http://localhost:3000`.

## Features

- Deposit ETH
- Borrow ETH (up to 50% collateral)
- View balances

