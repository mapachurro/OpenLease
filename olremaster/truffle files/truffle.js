const path = require('path')
const HDWalletProvider = require('truffle-hdwallet-provider')

require('dotenv').config() // Store environment-specific variable from '.env' to process.env

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    // testnets
    // properties
    // network_id: identifier for network based on ethereum blockchain. Find out more at https://github.com/ethereumbook/ethereumbook/issues/110
    // gas: gas limit
    // gasPrice: gas price in gwei
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY),
      network_id: 3,
      gas: 3000000
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://kovan.infura.io/v3/' + process.env.INFURA_API_KEY),
      network_id: 42,
      gas: 3000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY),
      network_id: 4,
      gas: 3000000
    },
    // main ethereum network(mainnet)
    main: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY),
      network_id: 1,
      gas: 3000000
    }
  }
}
