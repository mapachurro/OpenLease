# EthPM Registry

Create a new EthPM registry on chain, and provide a library for integration with EthPM.

Proof of concept; more details and documentation still to come.

### Command Line

Create a new EPM registry on chain using the given from address.

:warning: Warning :warning: This command line tool requires an open Ethereum client in order to create the registry, which is wildly insecure. Use this at your own risk. This process can be greatly improved.

```
$ epmr new --from "0x1234..." [--host localhost] [--port 8545]
```

### Library

```javascript
var EthPMRegistry = require("ethpm-registry");
var registry = EthPMRegistry.use(registry_address, from_address, web3_provider);

// Now you can use `registry` as valid registry interface within EthPM.
```

### Testing

```
$ npm test
```
