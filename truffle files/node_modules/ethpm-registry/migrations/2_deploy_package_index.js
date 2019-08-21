var WhitelistAuthority = artifacts.require("WhitelistAuthority.sol");
var ReleaseValidator = artifacts.require("ReleaseValidator.sol");
var SemVersionLib = artifacts.require("SemVersionLib.sol");
var IndexedOrderedSetLib = artifacts.require("IndexedOrderedSetLib.sol");
var PackageDB = artifacts.require("PackageDB.sol");
var ReleaseDB = artifacts.require("ReleaseDB.sol");
var PackageIndex = artifacts.require("PackageIndex.sol");

// Rememver, web3 is given to us. Probably magic that needs to be removed.
// TODO: Remove hardcoding of signatures and have a function like this one search abis
// looking for the function by name, and error if a function is not found.
function four_byte_sig(signature) {
  return web3.sha3(signature).substring(0, 10);
}

module.exports = function(deployer) {
  deployer.deploy([
    WhitelistAuthority,
    ReleaseValidator,
    SemVersionLib,
    IndexedOrderedSetLib
  ]);
  deployer.link(SemVersionLib, [PackageDB, ReleaseDB]);
  deployer.link(IndexedOrderedSetLib, [PackageDB, ReleaseDB]);

  var package_index;
  var package_db;
  var release_db;
  var whitelist_authority

  deployer.deploy([
    PackageDB,
    ReleaseDB,
    PackageIndex
  ]).then(function() {
    return PackageIndex.deployed();
  }).then(function(instance) {
    package_index = instance;
    return PackageDB.deployed();
  }).then(function(instance) {
    package_db = instance;
    return ReleaseDB.deployed();
  }).then(function(instance) {
    release_db = instance;
    return WhitelistAuthority.deployed();
  }).then(function(instance) {
    whitelist_authority = instance;

    return Promise.all([
      package_index.setPackageDb(PackageDB.address),
      package_index.setReleaseDb(ReleaseDB.address),
      package_index.setReleaseValidator(ReleaseValidator.address)
    ]);
  }).then(function() {
    return Promise.all([
      package_db.setAuthority(WhitelistAuthority.address),
      release_db.setAuthority(WhitelistAuthority.address),
      package_index.setAuthority(WhitelistAuthority.address)
    ]);
  }).then(function() {
    return Promise.all([
      // ReleaseDB
      whitelist_authority.setCanCall(PackageIndex.address, ReleaseDB.address, four_byte_sig("setRelease(bytes32,bytes32,string)"), true),
      whitelist_authority.setAnyoneCanCall(ReleaseDB.address, four_byte_sig("setVersion(uint32,uint32,uint32,string,string)"), true),
      whitelist_authority.setAnyoneCanCall(ReleaseDB.address, four_byte_sig("updateLatestTree(bytes32)"), true),

      // PackageDB
      whitelist_authority.setCanCall(PackageIndex.address, PackageDB.address, four_byte_sig("setPackage(string)"), true),
      whitelist_authority.setCanCall(PackageIndex.address, PackageDB.address, four_byte_sig("setPackageOwner(bytes32,address)"), true),

      // PackageIndex
      whitelist_authority.setAnyoneCanCall(PackageIndex.address, four_byte_sig("release(string,uint32,uint32,uint32,string,string,string)"), true),
      whitelist_authority.setAnyoneCanCall(PackageIndex.address, four_byte_sig("transferPackageOwner(string,address)"), true)
    ]);
  });
};
