# 0. Dependencies
We need to install first git-client and python, however some versions of OSX has already installed it. You can check what version is installed by executing one of the following commands:
```bash
$ python -V
$ python2 -V
$ python27 -V
$ python2.7 -V
```
If none of the commands above gives a result means you need install python in the step 0.1.

#### **1. Git Client**
If your system is already updated and you have the build-essential libraries installed, just execute this command:
```bash
$ sudo apt-get install git
``` 

#### **2. Python 2.7**
Python Version 3.0 is not supported for some node packages. If you have installed the build-essential libraries, just execute this command:

1. Install homebrew
    ```bash
    $ usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
2. Add enviroment variable to PATH
    ```bash
    $ export PATH=/usr/local/bin:/usr/local/sbin:$PATH
    ```
3. Install python from terminal
    ```bash 
    $ brew install python
    ```
4. Check your installation
    ```bash 
    $ python -V
    ```

# 1. Ethereum Full Node

Install using PPA in ubuntu

1. Add repository to homebrew
    ```bash
    $ brew tap ethereum/ethereum
    ```
3. Install Ethereum
    ```bash
    $ brew install ethereum
    ```
4. Make sure your installation is correct
    ```bash
    $ geth --help
    ```
# 2. NodeJS 8.x
To install node.js on macOS Sierra  (or OSX 10.11, 10.10 and OSX 10.9)  you can download a pre-compiled binary package which makes a nice and easy installation (http://nodejs.org/). 

**Verify installation**

    ```bash 
    $ node -v
    $ nodejs -v
    $ npm -v
    ```
    
# 3. Node-Gyp Package

1. Install latest version of XCode
2. Enable developer xcode tools
    ```bash
    $ sudo xcodebuild -license accept
    $ xcode-select --install
    ```
2. Execute the following command
    ```bash
    $ npm install -g node-gyp
    ```
Sometimes its necessary to execute this command using sudo privileges.
  
# 3. Web3 Node Package

1. Open new terminal window
2. Execute the following command
    ```bash
    $ npm install -g web3
    ```
License
----
MIT
