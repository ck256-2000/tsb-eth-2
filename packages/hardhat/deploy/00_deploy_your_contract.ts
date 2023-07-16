import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

 

  await deploy("TSBGame01", {
    from: deployer,
    // Contract constructor arguments
    //Linked In VRF ID, Link Token Address, SHIB Token Address, Burner Wallet Address, Admin Wallet
    //DEV Line below
    //args: [122,'0x514910771AF9Ca656af840dff83E8264EcF986CA','0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce','0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc','0x976EA74026E726554dB657fA54763abd0C3a0aa9'],
    
    //production below:  
    //Burner Wallet Monitored: 0xa98e20e5508FFef2bC0fCC7F913A30D1f827a727 
    //Blackhole Burner Wallet:
    //Admin Wallet: 0xD18Ac90F9907ed7d16F8B0C4Ae855707FB4849c9
    args: [122,'0x514910771AF9Ca656af840dff83E8264EcF986CA','0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce','0xa98e20e5508FFef2bC0fCC7F913A30D1f827a727','0xD18Ac90F9907ed7d16F8B0C4Ae855707FB4849c9'],
     

    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: false,
  });


  // Deploy the contract - Need to add each contract here - Separate code block for each one.
  await deploy("Shib", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

    // Deploy the contract - Need to add each contract here - Separate code block for each one.
    await deploy("YourContract", {
      from: deployer,
      // Contract constructor arguments
      args: [deployer],
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });
  
  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
