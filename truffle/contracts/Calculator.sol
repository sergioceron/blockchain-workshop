pragma solidity ^0.4.0;


contract Calculator {
    address public owner;

    event Sum(int a, int b, int c);
    event Mult(int a, int b, int c);
    event Div(int a, int b, int c);
    event Pow(int a, uint b, uint c);
    event Factorial(uint a, uint c);

    modifier sudo {if (msg.sender == owner) _;}

    function Calculator() public {
        owner = msg.sender;
    }

    function sum(int a, int b) public sudo returns (int)  {
        int c = a + b;
        Sum(a, b, c);
        return c;
    }

    function mult(int a, int b) public sudo returns (int) {
        int c = a * b;
        Mult(a, b, c);
        return c;
    }

    function div(int a, int b) public sudo returns (int) {
        require(b != 0);
        int c = a / b;
        Div(a, b, c);
        return c;
    }

    function pow(uint a, uint b) public sudo returns (uint) {
        uint c = a ** b;
        Pow(2, b, c);
        return c;
    }

    function fact(uint a) public sudo returns (uint) {
        uint c = 1;
        for( uint i = 2; i <= a; i++ ){
            c *= i;
        }
        Factorial(a, c);
        return c;
    }

    function isNegative(int a) public sudo returns (bool) {
        return a > 0 ? true : false;
    }
}