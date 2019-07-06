var auction = artifacts.require("./auction.sol");

module.exports = function(deployer) {
  deployer.deploy(auction,"Jenil", 1, {gas: 6700000});
};
