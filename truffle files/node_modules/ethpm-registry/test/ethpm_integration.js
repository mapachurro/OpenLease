var assert = require("assert");
var EthPM = require("ethpm");
var Registry = require("../lib/registry");
var temp = require("temp").track();
var fs = require("fs-extra");
var path = require("path");
var ipfsd = require("ipfsd-ctl");
var EPMR = require("../index");

var PackageIndex = artifacts.require("PackageIndex.sol");

contract("EthPM integration", function() {
  var package_path;
  var config;
  var ipfs_node;
  var ipfs_host;
  var ipfs_port;
  var host;
  var registry;
  var accounts;

  before("get accounts", function(done) {
    web3.eth.getAccounts(function(err, accs) {
      if (err) return done(err);
      accounts = accs;
      done();
    });
  });

  before("set up IPFS server", function(done) {
    this.timeout(10000);

    ipfsd.disposable(function (err, node) {
      if (err) return done(err);

      ipfs_node = node;

      ipfs_node.startDaemon(function(err, ipfs) {
        if (err) return done(err);

        ipfs_host = ipfs.apiHost;
        ipfs_port = ipfs.apiPort;

        done(err);
      });
    });
  });

  before("set up test package", function(done) {
    var temp_package_path = temp.mkdirSync("eth-registry-test-package-");
    var example_package = path.resolve(path.join(__dirname, "./owned-example"));

    fs.copy(example_package, temp_package_path, {}, function(err) {
      if (err) return done(err);

      package_path = temp_package_path;
      done();
    });
  });

  before("set up ethpm config", function() {
    this.timeout(5000);
    host = new EthPM.hosts.IPFS(ipfs_host, ipfs_port);
    registry = new Registry(PackageIndex.address, accounts[0], web3.currentProvider);
    pkg = new EthPM(package_path, host, registry);
  });

  after("kill ipfs node", function(done) {
    // Why would IPFS call the callback twice? Madness.
    ipfs_node.stopDaemon(function() {
      done();
      done = function() {};
    });
  });

  it("registers the package correctly", function() {
    // Note we cheat a little bit here so we don't have to add more dependencies
    // or do any compiling.
    var contract_metadata = {owned: {}, mortal: {}, transferable: {}};

    return pkg.publish().then(function() {
      return registry.getAllVersions("owned");
    }).then(function(versions) {
      assert.equal(versions.length, 1);
      assert.equal(versions[0], "1.0.0");

      return registry.getLockfileURI("owned", versions[0]);
    }).then(function(lockfileURI) {
      assert.notEqual(lockfileURI, null);
      return host.get(lockfileURI);
    }).then(function(lockfile_contents) {

      //console.log(lockfile_contents);
      // TODO: assert lockfile contents data here
    });
  });

  it("errors when you try to register the same version twice", function(done) {
    // Note we cheat a little bit here so we don't have to add more dependencies
    // or do any compiling.
    var contract_metadata = {owned: {}, mortal: {}, transferable: {}};

    pkg.publish().then(function() {
      return registry.getAllVersions("owned");
    }).then(function() {
      done(new Error("Should not have gotten here. Should have errored beforehand."));
    }).catch(function(e) {
      assert(e.message.indexOf("Could not publish package. Please check version number and ensure it was not previously published.") == 0);
      done();
    });
  });
});
