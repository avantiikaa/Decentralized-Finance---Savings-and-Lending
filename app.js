import React, { useState, useEffect } from "react";
import Web3 from "web3";
import LendingABI from "./LendingABI.json";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LendingABI.networks[networkId];
      const lending = new web3.eth.Contract(
        LendingABI.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(lending);

      const bal = await lending.methods.getBalance().call({ from: accounts[0] });
      setBalance(web3.utils.fromWei(bal, "ether"));

      const bor = await lending.methods.getBorrowed().call({ from: accounts[0] });
      setBorrowed(web3.utils.fromWei(bor, "ether"));
    } else {
      alert("Install MetaMask");
    }
  };

  const deposit = async () => {
    await contract.methods.deposit().send({
      from: account,
      value: Web3.utils.toWei(depositAmount, "ether"),
    });
    window.location.reload();
  };

  const borrow = async () => {
    await contract.methods.borrow(Web3.utils.toWei(borrowAmount, "ether")).send({
      from: account,
    });
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>DeFi Savings & Lending</h1>
      <p>Connected Account: {account}</p>
      <h2>Dashboard</h2>
      <p>Deposited: {balance} ETH</p>
      <p>Borrowed: {borrowed} ETH</p>

      <div>
        <h3>Deposit ETH</h3>
        <input
          type="text"
          placeholder="Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={deposit}>Deposit</button>
      </div>

      <div>
        <h3>Borrow ETH</h3>
        <input
          type="text"
          placeholder="Amount"
          value={borrowAmount}
          onChange={(e) => setBorrowAmount(e.target.value)}
        />
        <button onClick={borrow}>Borrow</button>
      </div>
    </div>
  );
}

export default App;
