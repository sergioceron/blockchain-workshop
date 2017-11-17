pragma solidity ^0.4.0;


contract Escrow {
    enum Status {
        OPEN, CLOSED
    }

    address public collector;
    event Deposit(address indexed sender, uint amount);
    event Withdrawal(address indexed sender, uint amount);
    event Release(uint amount);

    uint private withdraw_fee;
    uint public released;
    uint public minimum;
    uint public deadline;
    mapping(address => uint) public deposits;

    modifier sudo {
        if (msg.sender == collector) _;
    }

    // fallback function (accepts ether payments)
    function() payable public{
        if( deposits[msg.sender] == 0 ){
            deposits[msg.sender] = msg.value;
        } else {
            deposits[msg.sender] += msg.value;
        }
        Deposit( msg.sender, msg.value );
    }

    function Escrow(uint min, uint date) public {
        released = 0;
        minimum = min;
        deadline = date;
        collector = msg.sender;
        withdraw_fee = 200 finney;
    }

    // redeploy contract and make the initial balance of every account must be 0
    function withdraw(uint amount) public {
        require( deposits[msg.sender] >= amount );
        assert( block.timestamp < deadline - 1 days );
        if (!msg.sender.send(amount - withdraw_fee)) {
            deposits[msg.sender] -= amount;
            Withdrawal( msg.sender, amount );
        }
    }

    function release(uint amount) public sudo {
        require( amount >= 1 ether );
        assert( this.balance >= minimum );
        assert( block.timestamp > deadline - 1 days );
        if (!collector.send(amount)) {
            Release( amount );
        }
    }

}