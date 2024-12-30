pragma solidity 0.8.19;

contract Inbox {
    string public message;

    constructor(string memory intitalMessage) {
        message = intitalMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
