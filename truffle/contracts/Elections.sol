pragma solidity ^0.4.0;

contract BallotBox {
    mapping( uint16 => uint ) public votes;
    address public owner;
    uint16 public id;
    bool public isOpen;
    uint16 candidates;
    MainBox private mainbox;

    event Vote(address indexed sender, uint16 candidate);

    modifier sudo {
        if (msg.sender == owner) _;
    }

    modifier checkStatus {
        if( isOpen ) _;
    }

    modifier uniqueVote {
        if( !mainbox.alreadyVote() ) _;
    }

    // fallback function (rejects ether payments)
    function() public {
        revert();
    }

    function BallotBox(uint16 _id, uint16 _candidates, MainBox _mainbox ) public {
        id = _id;
        candidates = _candidates;
        isOpen = true;
        mainbox = _mainbox;
    }

    function close() external sudo checkStatus returns (bool) {
        isOpen = false;
    }

    function vote( uint16 candidate ) uniqueVote checkStatus public {
        require(candidate < candidates);
        Vote( msg.sender, candidate );
        mainbox.markMyVote();
        votes[ candidate ] += 1;
    }
}

contract MainBox {
    mapping( uint16 => uint ) public totalVotes;
    mapping( uint16 => BallotBox ) public ballotboxes;
    mapping( address => uint ) private voters;

    address public owner;
    uint16 public _candidates;
    uint public _deadline;
    uint16 public _boxes;

    modifier sudo {
        if (msg.sender == owner) _;
    }

    // fallback function (rejects ether payments)
    function() public{
        revert();
    }

    function MainBox(uint16 candidates, uint16 boxes, uint deadline) public {
        owner = msg.sender;
        _deadline = deadline;
        _candidates = candidates;
        _boxes = boxes;
        for( uint16 i = 0; i < boxes; i++ ){
            ballotboxes[i] = new BallotBox( i, candidates, this );
        }
    }

    function alreadyVote() external returns (bool){
        return voters[msg.sender] == 1;
    }

    function markMyVote() external {
        voters[msg.sender] = 1;
    }

    function makeCount() public sudo returns (bool) {
        assert(block.timestamp >= _deadline);
        for( uint16 i = 0; i < _boxes; i++ ){
            for( uint16 c = 0; c < _candidates; c++ ){
                BallotBox box = ballotboxes[i];
                totalVotes[c] += box.votes(c);
            }
            ballotboxes[i].close();
        }
        return true;
    }

}