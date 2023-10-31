require("dotenv").config(); //env파일
//지갑 프로바이더 추가
const PrivateKeyProvider = require("@truffle/hdwallet-provider");

const privateKeyProvider = new PrivateKeyProvider(
  process.env.PRIVATE_KEY,
  process.env.JSON_RPC_ENDPOINT
);

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1", // RPC 서버
    //   port: 7545, // Standard Ethereum port (default: none)
    //   network_id: "*", // Any network (default: none)
    // },

    besuWallet: {
      network_id: "*",
      gasPrice: "0",
      provider: privateKeyProvider,
      gas: "0x1ffffffffffffe",
    },
  },

  contracts_build_directory: "../client/src/abis",

  //코드 최적화
  compilers: {
    solc: {
      version: "0.8.10",
      optimizer: {
        enabled: "true",
        runs: 200,
      },
    },
  },
};
