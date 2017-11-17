pragma solidity ^0.4.0;


contract Board {
    enum Status {
        NEW, MODIFIED
    }

    struct Message {
        string message;
        Status status;
    }

    address public admin;
    event Log(address indexed author, uint8 indexed action, string message);
    mapping (address => Message[]) public messages;

    modifier sudo {
        if (msg.sender == admin) _;
    }

    // fallback function (rejects ether payments)
    function() public{
        revert();
    }

    function Board() public {
        admin = msg.sender;
    }

    function post(string message) public returns (uint) {
        Log( msg.sender, 0, message );
        return messages[msg.sender].push(Message({message: message, status : Status.NEW}));
    }

    function edit(uint id, string message) public {
        assert(messages[msg.sender].length - 1 >= id  );
        Log( msg.sender, 1, message );
        messages[msg.sender][id] = Message({message: message, status : Status.MODIFIED});
    }

    function remove(uint id) public {
        assert(messages[msg.sender].length - 1 >= id  );
        delete messages[msg.sender][id];
    }
}