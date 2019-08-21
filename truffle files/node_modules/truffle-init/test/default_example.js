var path = require("path");
var fs = require("fs-extra");
var assert = require("assert");
var Init = require("../");

describe("Downloader", function() {
  var config = {
    logger: {
      log: function() {}
    },
    working_directory: path.join(__dirname, ".truffle_test_temp")
  };
  var destination = config.working_directory;

  before("mkdir", function(done) {
    fs.ensureDir(config.working_directory, done);
  });

  after("remove temp directory", function(done) {
    fs.remove(config.working_directory, done);
  });

  it("downloads default example from github", function() {
    this.timeout(5000);

    return Init.fromGithub(config, "default", destination).then(function(init_config) {
      assert.notEqual(init_config, null);

      // Note: the file we're looking for exists in the trufflesuite/truffle-init-default repo!
      var expected_file_path = path.join(destination, "truffle.js");
      assert(fs.existsSync(expected_file_path), "Expected file doesn't exist!");
    });
  });

  it("ignores files listed in the truffle-init.json file, and removes the truffle-init.json file", function() {
    // Assert the file is not there first.
    assert(fs.existsSync(path.join(destination, "truffle-init.json")) == false, "truffle-init.json shouldn't be available to the user!");

    // Now assert the README.md and the .gitignore file were removed.
    assert(fs.existsSync(path.join(destination, "README.md")) == false, "README.md didn't get removed!");
    assert(fs.existsSync(path.join(destination, ".gitignore")) == false, ".gitignore didn't get removed!");
  });

  it("won't re-init if truffle.js file exists", function(done) {
    this.timeout(5000);

    var contracts_directory = path.join(destination, "contracts");

    // Assert our precondition
    assert(fs.existsSync(contracts_directory), "contracts directory should exist for this test to be meaningful");

    fs.remove(contracts_directory, function(err) {
      if (err) return done(err);

      Init.fromGithub(config, "default", destination).then(function(init_config) {
        assert(fs.existsSync(contracts_directory) == false, "Contracts directory got recreated when it shouldn't have");
        done();
      }).catch(function(e) {
        if (e.message.indexOf("A Truffle project already exists at the destination.") >= 0) {
          done();
        } else {
          done(new Error("Unknown error received: " + e.stack));
        }
      });
    })
  });
});
