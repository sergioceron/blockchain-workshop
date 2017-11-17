var config = require( '../config' );

module.exports = function( web3 ) {
    var mainbox = new web3.eth.Contract( config.contracts.elections.mainbox.abi, config.contracts.elections.mainbox.address );

    return {
        // Vote for a specific candidate in specific ballotbox
        vote: function( from, passphrase, address, candidate ) {
            web3.eth.personal.unlockAccount( from, passphrase, function( e, result ) {
                var ballotbox = new web3.eth.Contract( config.contracts.elections.ballotbox.abi, address );
                if( e ) return console.error( e );
                ballotbox.methods.vote( candidate ).send( {
                    from: from,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    if( result.events.Vote ) {
                        console.log( 'Vote to candidate #' + candidate + ', from: ' + from );
                    } else {
                        console.warn( 'You already vote for the candidate #' + candidate + ' or elections are closed' );
                    }
                } );
            } );
        },
        // Make count of all ballotboxes and close elections
        makeCount: function() {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                mainbox.methods.makeCount().send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( 'MakeCount, locking all ballotboxes, hash: ' + result.blockHash );
                } );
            } );
        },
        // Get all votes for a specific candidate
        getVotesTo: function( candidate ) {
            mainbox.methods.votes( from ).call( function( err, result ) {
                if( err ) return console.error( err );
                console.log( 'Total votes for candidate: ' + candidate + ' are ' + result );
            } );
        },
        // Get all votes for a specific candidate
        getBoxAddress: function( id ) {
            mainbox.methods.ballotboxes( id ).call( function( err, result ) {
                if( err ) return console.error( err );
                console.log( 'Address of Ballot Box: ' + id + ' is ' + result );
            } );
        },
        // Get all votes for a specific candidate
        alreadyVote: function( address, passphrase ) {
            mainbox.methods.alreadyVote().call( function( err, result ) {
                if( err ) return console.error( err );
                console.log( 'Is Already Vote ' + address + '? ' + result );
            } );
        },
        // Monitor votes in real time
        watchVotes: function( address ) {
            var ballotbox = new web3.eth.Contract( config.contracts.elections.ballotbox.abi, address );
            ballotbox.events.allEvents( {}, function( error, event ) {
                if( error ) {
                    console.error( error );
                } else {
                    var ret = event.returnValues;
                    console.log( 'New Vote to ' + ret.candidate + ' from ' + ret.sender );
                }
            } );
        }
    }
}

