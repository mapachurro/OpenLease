var DraftOhioResidentialLease = artifacts.require('./DraftOhioResidentialLease.sol')

module.exports = function (deployer) {
  deployer.deploy(DraftOhioResidentialLease)
};
