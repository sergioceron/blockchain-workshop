var Migrations = artifacts.require("Migrations");
var Calculator = artifacts.require("Calculator");
var Board = artifacts.require("Board");
var Escrow = artifacts.require("Escrow");
var BallotBox = artifacts.require("BallotBox");
var MainBox = artifacts.require("MainBox");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Calculator);
  deployer.deploy(Board);
  deployer.deploy(Escrow);
  deployer.deploy(BallotBox);
  deployer.deploy(MainBox);
};
