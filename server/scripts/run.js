const main = async () => {
    const fundsContractFactory = await hre.ethers.getContractFactory("Funds");
    const fundsContract = await fundsContractFactory.deploy({
        value: hre.ethers.utils.parseEther("4"),
    });

    await fundsContract.deployed();

    console.log('contract addy: ', fundsContract.address);
    let contractBalance = await hre.ethers.provider.getBalance(
        fundsContract.address
      );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );
    

    const [_, randomPerson] = await hre.ethers.getSigners()
    const sendFunds = await fundsContract.connect(randomPerson).sendFunds(randomPerson.address, 1)
    await sendFunds.wait()

    const [pp, randomPerso] = await hre.ethers.getSigners()
    const sendFund = await fundsContract.connect(randomPerson).sendFunds(randomPerso.address, 1)
    await sendFund.wait()

    const allTxn = await fundsContract.getAllTxn();
    console.log(allTxn)
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );
    
}

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();