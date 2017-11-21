The structure of this practice is as follows.

| Folder | README |
| --- | --- |
| /contract | Solidity contract sources and binaries |
| /app/app.js | NodeJS main application |
| /app/test/* | Test for every contract |
| /app/test/config | Configuration file |


# 1. Setup Enviroment
First, we need to setup our development environment.
  - For Windows 7,8,10. [Instructions-Win.md](Installaction-Win.md)
  - For Unix (Ubuntu 16.04). [Instructions-Unix.md](Installaction-Unix.md)
  - For MacOS ElCapitan and Sierra. [Instructions-OSX.md](Installaction-OSX.md)
  
# 2. Run Ethereum Full Node
To configure ethereum in private network mode:

1. Create a configuration file (genesis.json)
    ```json
    {
        "config": {
            "chainId": 123456780221054942,
            "homesteadBlock": 0,
            "eip155Block": 0,
            "eip158Block": 0
        },
        "difficulty": "0x20000",
        "gasLimit": "0x1DF5E70",
        "extraData": "0x6365726f6e",
        "alloc": {
        }
    }
    ```
2. Initialize ethereum blockchain with custom network and genesis id.
    ```bash
    $ geth --datadir data --networkid 123456780221054942 --ipcpath $ethereumpath/geth.ipc --rpc --rpcapi "eth,net,web3,admin,personal" --rpcaddr=localhost --rpcport=6545 init genesis.json
    ```
3. Run geth service with RPC api enabled
    ```bash
    $ geth --datadir data --networkid 123456780221054942 --ipcpath $ethereumpath/geth.ipc --rpc --rpcapi "eth,net,web3,admin,personal" --rpcaddr=localhost --rpcport=6545 console
    ```
4. Inside the geth console, create a new account, which will be the *coinbase* account
    ```bash
    > personal.newAccount('YOUR_PASSPHRASE');
    ```
    Don't forget to keep safe your passphrase
    
# 3. Deploy contract
The contract files is located in the subdirectory contract.
- **contract-\*.sol**: The source code of contract in solidity language
- **contract-\*.abi**: The interface definition of contract
- **contract-\*.bin**: The bytecode of contract, used to deploy in ethereum.

**Note:** Where \* it's a wildcard to represent the name of the contract.

1. Open new terminal tab/window and execute:
    ```bash
    $ geth attach
    ```
2. Start mining ethers to coinbase
    ```bash
    > miner.start()
    ```
    Wait to ethereum builds the DAG file and start mining.
2. Unlock your account
    ```bash
    > personal.unlockAccount('your coinbase address', 'your passphrase')
    ```
3. Open another terminal window and execute ```geth attach``` to deploy the contract
    ```javascript
    > var contract = web3.eth.contract(ABI_INTERFACE);
    > var instance = contract.new({
                               from: 'your coinbase address', 
                               data: CONTRACT_BYTECODE, 
                               gas: '4700000'
                     }, function (e, c){
                           if (typeof c.address !== 'undefined') {
                               console.log('Contract mined! address: ' + c.address + ' transactionHash: ' + c.transactionHash);
                           }
                     });
    ```
4. Wait to see in the terminal something like this:
    ```bash
    Contract mined! address: 0xdaa24d02bad7e9d6a80106db164bad9399a0423e
    ```
    That's your contract address.
5. Repeat 1-4 steps for every contract in the folder.

**Note:** You can compile your code without a solidity compiler installed in your computer, in this case you can use this online web tool to get the bytecode and ABI definition: https://ethereum.github.io/browser-solidity/
    
# 4. Run NodeJS App
The nodejs application uses just web3 (https://github.com/expressjs) as webserver and Hoogan.js (http://twitter.github.io/hogan.js/) npm package for template view engine. The project is located in the subdirectory ```app```.

1. Open a terminal window and go to app directory
2. Install the nodejs dependencies
    ```bash
    $ npm install -d
    ```
3. Open config.js file and replace the following lines with the coinbase address, passphrase created in the step 2.1 and contract address deployed.
    ```bash
    ipc: 'PATH_TO_IPC'
    ...
    coinbase: 'YOUR_FIRST_ACCOUNT_ADDRESS',
    passphrase: 'YOUR_FIRST_ACCOUNT_PASSPHRASE'
    ```
    Also you need to change the contract addresses generated in the step 3.
    ```bash
    contracts: {
       ...
       contract_name: {
           ...
           address: 'YOUR_COTNRACT_ADDRESS'
       }
       ...
    }
    ```
4. Run application main file
    ```bash
    $ nodejs app.js
    ```
    or
    ```bash
    $ node app.js
    ```
**Note:** Your ethereum node must be mining while the application is running.
# FAQ
### The IPC file location for every OS.

 - **Windows:** ~/AppData/Roaming/Ethereum/geth.ipc
 - **MacOS:** ~/Library/Ethereum/geth.ipc
 - **Linux:** ~/.ethereum/geth.ipc
 
 # Links
 
  - **How to install command line tools in OSX:** http://railsapps.github.io/xcode-command-line-tools.html
  - **Ethereum Wallet:** https://github.com/ethereum/mist/releases/tag/v0.9.2
  - **Remix Solidity Compiler:** https://remix.ethereum.org/
  - **Time converter to seconds:** http://www.ruddwire.com/handy-code/date-to-millisecond-calculators/#.WglN6dvmGCR
