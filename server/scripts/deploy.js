const main = async () => {
const [deployer] = await hre.ethers.getSigners();
const accountBalance = await deployer.getBalance();

console.log("deploying contracts with account ", deployer.address);
console.log("account balance ", accountBalance.toString());

const fundsContractFactory = await hre.ethers.getContractFactory("Funds");
const fundsContract = await fundsContractFactory.deploy();

await fundsContract.deployed();

console.log("Funds contract address: ", fundsContract.address)

}

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

runMain();