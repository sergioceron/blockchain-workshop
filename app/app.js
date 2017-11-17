var config = require( './config' );
var Web3 = require( 'web3' );
var web3 = new Web3();

//web3.setProvider( new Web3.providers.HttpProvider( 'http://' + config.eth.server + ':' + config.eth.port + '/' ) );
web3.setProvider( new Web3.providers.IpcProvider( config.eth.ipc, require( 'net' ) ) );
/*
var calculator = require( './tests/calculator' )( web3 );
calculator.testSum( 3, 4 );
calculator.testDivision( 23, 7 );
calculator.testMultiplication( 5, 6 );
calculator.testPow( 9, 3 );
calculator.testFactorial( 9 );

var bulletinboard = require( './tests/bulletinboard' )( web3 );
bulletinboard.getAllMessages();
bulletinboard.watchEvents();
bulletinboard.postMessage( 'Hi there!' );
bulletinboard.editMessage( 0, 'I was wrong...' );

var escrow = require( './tests/escrow' )( web3 );
escrow.getTotalReceived();
escrow.getDepositFromAccount('0xba95F559718DC57B3014b2805f2E5840F14DaF54');
escrow.watchDeposits(2);
escrow.deposit( '0xba95F559718DC57B3014b2805f2E5840F14DaF54', 'Sxceron.345', 10 );
escrow.withdraw( '0xba95F559718DC57B3014b2805f2E5840F14DaF54', 'Sxceron.345', 1 );
escrow.release( 1 );
*/
var elections = require( './tests/elections' )( web3 );
//elections.getBoxAddress(0);
//elections.vote('0xba95F559718DC57B3014b2805f2E5840F14DaF54', 'Sxceron.345', '0x44AB0e2F67de7E49DFe9896099d18C315840Ac9a', 1);
//elections.watchVotes('0x44AB0e2F67de7E49DFe9896099d18C315840Ac9a');
elections.alreadyVote('0xba95F559718DC57B3014b2805f2E5840F14DaF54');