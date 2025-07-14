// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lending {
    mapping(address => uint) public balances;
    mapping(address => uint) public borrowed;
    uint public interestRate = 3; // 3%

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function borrow(uint amount) external {
        require(amount <= balances[msg.sender] / 2, "Cannot borrow more than 50% collateral.");
        borrowed[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }

    function repay() external payable {
        borrowed[msg.sender] -= msg.value;
    }

    function getBalance() external view returns (uint) {
        return balances[msg.sender];
    }

    function getBorrowed() external view returns (uint) {
        return borrowed[msg.sender];
    }
}
