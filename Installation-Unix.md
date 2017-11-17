# 0. Dependencies
We need to install first git-client and python, however some versions of linux has already installed it, just verify what version is by executing any of following command:
```bash
$ python -V
$ python2 -V
$ python27 -V
$ python2.7 -V
```
If none of the commands above gives a result means you need install python in the step 0.2.

#### **0. Update your system**
In order to get latest version of programs and libraries, we first need to update our linux system.
 ```bash
 $ sudo apt-get update
 $ sudo apt-get upgrade
 ```
 Also it's necessary to install linux kernel dependencies to compile some packages.
 ```bash
 $ sudo apt-get install build-essential checkinstall
 $ sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev gcc
```

#### **1. Git Client**
If your system is already updated and you have the build-essential libraries installed, just execute this command:
```bash
$ sudo apt-get install git
``` 

#### **2. Python 2.7**
Python Version 3.0 is not supported for some node packages. If you have installed the build-essential libraries, just execute this command:

1. Download python using the following command:
    ```bash
    $ version=2.7.13
    $ wget https://www.python.org/ftp/python/$version/Python-$version.tgz
    ```
2. Extract and go to the directory:
    ```bash
    $ tar -xvf Python-$version.tgz
    $ cd Python-$version
    ```
3. Install using the command you just tried, using ``checkinstall`` instead to make it easier to uninstall if needed:
    ```bash 
    $ ./configure
    $ make
    $ sudo make install
    ```

# 1. Ethereum Full Node

Install using PPA in ubuntu

1. Add ethereum repository to PPA
    ```bash
    $ sudo apt-get install software-properties-common
    $ sudo add-apt-repository -y ppa:ethereum/ethereum
    ```
2. Update and load new repository
    ```bash
    $ sudo apt-get update
    ```
3. Install Ethereum
    ```bash
    $ sudo apt-get install ethereum
    ```
4. Make sure your installation is correct
    ```bash
    $ geth --help
    ```
# 2. NodeJS 8.x
Ubuntu has a NodeJS version by default in his repository, it's not the latest version but is an stable release. We can install it using the ``apt`` command.
1. Install 
    ```bash 
    $ sudo apt-get install nodejs
    $ sudo apt-get install npm
    ```
2. Verify installation
    ```bash 
    $ node -v
    $ nodejs -v
    $ npm -v
    ```
    
# 3. Node-Gyp Package

1. Open a terminal window
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
