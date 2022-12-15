
const hre = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const RoboPunkNFT = await hre.ethers.getContractFactory("RoboPunkNFT");
  const roboPunkNFT = await RoboPunkNFT.deploy();

  await roboPunkNFT.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp deployed to ${roboPunkNFT.address}`
  );
  // 0x416Def2B2752558b672f2266929936CBB8Ad454f
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
