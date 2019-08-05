var auction = artifacts.require("./auction.sol");

module.exports = function(deployer) {
  deployer.deploy(auction);
};
