# 0. Requisites
We need to install first git-client and python, however in windows, python will be installed automatically in the step 3.

#### **1. Git Client**
There are also a few ways to install Git on Windows. The most official build is available for download on the Git website. Just go to http://git-scm.com/download/win and the download will start automatically.

# 1. Ethereum Full Node

All versions of Geth are available for download at https://geth.ethereum.org/downloads/.

You can download it as an installer or just a portable zip file. The installer will puts geth into your PATH enviroment variables automatically. The zip file contains .exe file and can be used without installing, but you need to add the path to enviroment variable manually.

1. Download zip file
2. Extract geth.exe from zip
3. Open a command prompt and execute
    ```cmd
    $ chdir
    $ open geth.exe
    ```
    
# 2. NodeJS 8.x
NodeJS supports Windows officially. Just download it at http://nodejs.org and run the installer.

1. Download installer file
2. Try commands
    ```cmd
    $ node -v
    $ npm -v
    ```
# 3. Node-Gyp Package
Install all the required tools and configurations using Microsoft's windows-build-tools (https://github.com/nodejs/node-gyp).
1. Open a cmd command prompt with administrator privileges or a power shell (run as Administrator) terminal.
2. Execute the following command
    ```cmd
    $ npm install --global --production windows-build-tools 
    $ npm install -g node-gyp 
    ```

# 3. Web3 Node Package

1. Open a cmd command
2. Execute the following command
    ```cmd
    $ npm install -g web3
    ```
License
----
MIT
