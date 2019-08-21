var contract = require("truffle-contract");
var PackageIndex = contract(require("../build/contracts/PackageIndex.json"));
var ReleaseDB = contract(require("../build/contracts/ReleaseDB.json"));
var semver = require("semver");

function Registry(registry_address, from_address, provider) {
  ReleaseDB.setProvider(provider);

  ReleaseDB.defaults({
    from: from_address,
    gas: 3141592
  });
};

Registry.prototype.configurePackageIndex = function(address, from_address, provider) {
  PackageIndex.setProvider(provider);
  PackageIndex.defaults({
    from: from_address,
    gas: 3141592
  });
  return PackageIndex.at(address)
    .then((packageIndex) => this.package_index = packageIndex);
}

Registry.prototype.getAllVersions = function(package_name) {
  var self = this;

  return this.package_index.getAllPackageReleaseHashes(package_name).then(function(hashes) {
    var promises = hashes.map(function(hash) {
      return self.package_index.getReleaseData(hash);
    });

    return Promise.all(promises);
  }).then(function(releases) {

    // Convert releases to version strings
    var versions = releases.map(function(release) {
      var major = release[0];
      var minor = release[1];
      var patch = release[2];
      var preRelease = release[3];
      var build = release[4];

      var version_string = major + "." + minor + "." + patch;

      if (preRelease != 0 && preRelease != "") {
        version_string += "-" + preRelease;
      }

      if (build != 0 && build != "") {
        version_string += "+" + build;
      }

      return version_string;
    }).sort(semver.compare); // Sort via semver lib

    return versions;
  });
}

Registry.prototype.resolveVersion = function(package_name, version_range) {
  return this.getAllVersions(package_name).then(function(versions) {
    // This can be optimized.
    var max = null;

    versions.forEach(function(version) {
      if (semver.satisfies(version, version_range)) {
        if (max == null || semver.gte(version, max)) {
          max = version;
        }
      }
    });

    return max;
  });
};

Registry.prototype.getLockfileURI = function(package_name, version_range) {
  var self = this;
  var version_registry;
  var version;

  return this.resolveVersion(package_name, version_range).then(function(v) {
    if (v == null) {
      throw new Error("Cannot find any published versions of '" + package_name + "' with the specified version range (" + version_range + ")");
    }

    version = self.convertToObject(v);
    return self.package_index.getReleaseLockfileURI(package_name, version.major, version.minor, version.patch, version.preRelease, version.build);
  });
};

Registry.prototype.register = function(package_name, version, lockfileURI) {
  var self = this;
  return Promise.resolve().then(function() {
    version = self.convertToObject(version);
  }).then(function() {
    return self.package_index.release(package_name, version.major, version.minor, version.patch, version.preRelease, version.build, lockfileURI);
  }).then(function(results) {
    var release_log = null;

    for (var i = 0; i < results.logs.length; i++) {
      var log = results.logs[i];
      if (log.event == "PackageRelease") {
        release_log = log;
        break;
      }
    }

    if (release_log == null) {
      throw new Error("Could not publish package. Please check version number and ensure it was not previously published.")
    }
  });
};

Registry.prototype.convertToObject = function(version) {
  var pieces = version.split("+");
  version = pieces[0];

  var build = "";

  if (pieces.length > 1) {
    build = pieces[1];
  }

  var major = semver.major(version);
  var minor = semver.minor(version);
  var patch = semver.patch(version);
  var preRelease = (semver.prerelease(version) || []).join("."); // r

  return {
    major: major,
    minor: minor,
    patch: patch,
    preRelease: preRelease,
    build: build
  };
};

module.exports = Registry;
