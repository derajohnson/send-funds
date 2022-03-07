//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

//  0xAf021Ee3744cF5509992FD0aB93f008D27263895 - funds address

import "hardhat/console.sol";


contract Funds {

    constructor() payable {
        console.log('hello');
    }

    event NewTxn(address indexed to, uint amount, uint timestamp);


    struct SentTransaction{
        address reciever;
        uint amount;
        uint timestamp;
    }

    SentTransaction[] allTxn;


function sendFunds(address payable _to, uint amount) public payable{
    // console.log(address(this).balance);
    require(amount <= address(this).balance, "not enough funds" );
    (bool success, ) = _to.call{value: amount}("");
    require(success, "Unable to send Ether");
    allTxn.push(SentTransaction(_to, amount, block.timestamp));
    emit NewTxn(_to, amount, block.timestamp);
}

function getAllTxn() public view returns (SentTransaction[] memory) {
    return allTxn;
}
}

