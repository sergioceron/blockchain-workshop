var config = require( '../config' );

module.exports = function( web3 ) {
    var bulletinboard = new web3.eth.Contract( config.contracts.bulletinboard.abi, config.contracts.bulletinboard.address );

    return {
        // Get all messages created by coinbase
        getAllMessages: function() {
            for( var i = 0; i < 100; i++ ) {
                bulletinboard.methods.messages( config.eth.coinbase.address, i ).call( function( err, result ) {
                    if( result )
                        console.log( result.message );
                } );
            }
        },
        // Watch all events
        watchEvents: function( address ) {
            bulletinboard.events.allEvents( {
                filter: {
                    author: address//config.eth.coinbase.address
                }
                //,fromBlock: 0
            }, function( error, event ) {
                if( error ) {
                    console.error( error );
                } else {
                    var ret = event.returnValues;
                    switch( ret.action ) {
                        case '0':
                            console.log( 'New message: ' + ret.message );
                            break;
                        case '1':
                            console.log( 'Edited message: ' + ret.message );
                            break;
                    }
                }
            } );
        },
        // Test Post
        postMessage: function( message ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                bulletinboard.methods.post( message ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( 'Message posted!, hash: ' + result.blockHash );
                } );
            } );
        },
        // Test Edit
        editMessage: function( id, message ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                bulletinboard.methods.edit( id, message ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( 'Message edited!, hash: ' + result.blockHash );
                } );
            } );
        }
    }
}

