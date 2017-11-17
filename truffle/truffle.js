module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        development: {
            gas: 2400000,
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        }
    }
};
