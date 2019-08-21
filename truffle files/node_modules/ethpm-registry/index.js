var contract = require("truffle-contract");
var Registry = require("./lib/registry.js");
var Web3 = require("web3");

var EPMRegistry = {
  use: function(address, from_address, provider) {
    const registry = new Registry(address, from_address, provider);
    return registry.configurePackageIndex(address, from_address, provider)
      .then(() => registry);
  }
};

module.exports = EPMRegistry;
