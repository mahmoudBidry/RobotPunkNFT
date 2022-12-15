require("@nomicfoundation/hardhat-toolbox");

const dotenv =  require("dotenv"); 

dotenv.config(); // this allows to use .env file

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks : {
    goerli : {
      url  : process.env.REACT_APP_GOERLI,
      accounts : [process.env.REACT_APP_PRIVATE_KEY]
    },
  },
  etherscan : {
    apiKey : process.env.REACT_APP_ETHERSCAN_KEY
  }
};
