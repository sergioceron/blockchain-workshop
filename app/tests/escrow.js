var config = require( '../config' );
var Web3 = require( 'web3' );

module.exports = function( web3 ) {
    var escrow = new web3.eth.Contract( config.contracts.escrow.abi, config.contracts.escrow.address );

    return {
        deposit: function( from, passphrase, amount ) {
            web3.eth.personal.unlockAccount( from, passphrase, function( e, result ) {
                if( e ) return console.error( e );
                web3.eth.sendTransaction( {
                    from: from,
                    to: config.contracts.escrow.address,
                    value: web3.utils.toWei( amount, 'ether' )
                }, function( err, result ) {
                    if( err ) return console.error( err );
                    console.log( 'Deposit to contract from: ' + from + ' ' + amount + ' ethers, hash: ' + result.blockHash );
                } );
            } );
        },
        withdraw: function( from, passphrase, amount ) {
            web3.eth.personal.unlockAccount( from, passphrase, function( e, result ) {
                if( e ) return console.error( e );
                escrow.methods.withdraw( web3.utils.toWei( amount, 'ether' ) ).send( {
                    from: from,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( 'Withdraw funds from: ' + from + ' ' + amount + ' ethers, hash: ' + result.blockHash );
                } );
            } );
        },
        release: function( amount ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                escrow.methods.release( web3.utils.toWei( amount, 'ether' ) ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( 'Release funds of ' + amount + ' ethers, hash: ' + result.blockHash );
                } );
            } );
        },
        // Get all deposits from an specific account
        getDepositFromAccount: function( from ) {
            escrow.methods.deposits( from ).call( function( err, result ) {
                if( err ) return console.error( err );
                console.log( 'Total deposited from: ' + from + ' is ' + web3.utils.fromWei( result, 'ether' ) + ' ether' );
            } );
        },
        // Get the total amount of ethers received in the contract
        getTotalReceived: function() {
            var total = web3.eth.getBalance( config.contracts.escrow.address, function( err, balance ) {
                if( err ) return console.error( err );
                console.log( 'Total Escrow Received: ' + web3.utils.fromWei( balance, 'ether' ) + ' ethers' );
            } );
        },
        // Watch all events
        watchDeposits: function( amount ) {
            escrow.events.Deposit( {}, function( error, event ) {
                if( error ) {
                    console.error( error );
                } else {
                    var ret = event.returnValues;
                    console.log( 'New deposit from: ' + ret.sender + ' of ' + ret.amount + ' ethers' );
                }
            } );
        }
    }
}

