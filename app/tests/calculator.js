var config = require( '../config' );

module.exports = function( web3 ) {
    var calculator = new web3.eth.Contract( config.contracts.calculator.abi, config.contracts.calculator.address );

    return {
        // Test Sum
        testSum: function( a, b ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                calculator.methods.sum( a, b ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( a + '+' + b + '=' + result.events.Sum.returnValues.c );
                } );
            } );
        },
        // Test Multiplication
        testMultiplication: function( a, b ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                calculator.methods.mult( 3, 7 ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( a + '*' + b + '=' + result.events.Mult.returnValues.c );
                } );
            } );
        },
        // Test Division
        testDivision: function( a, b ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                calculator.methods.div( a, b ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( a + '/' + b + '=' + result.events.Div.returnValues.c );
                } );
            } );
        },
        // Test Pow
        testPow: function( a, b ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                calculator.methods.pow( a, b ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( a + '^' + b + '=' + result.events.Pow.returnValues.c );
                } );
            } );
        },
        // Test Factorial
        testFactorial: function( a ) {
            web3.eth.personal.unlockAccount( config.eth.coinbase.address, config.eth.coinbase.passphrase, function( e, result ) {
                if( e ) return console.error( e );
                calculator.methods.fact( a ).send( {
                    from: config.eth.coinbase.address,
                    gas: 240000
                } ).on( 'error', function( e ) {
                    console.error( e );
                } ).then( function( result ) {
                    console.log( a + '!=' + result.events.Factorial.returnValues.c );
                } );
            } );
        }
    }
}