const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require('web3');
const { abi, evm } = require("./compile");
const dotenv = require('dotenv').config();

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: process.env.SECRTET_PHRASE
    },
    providerOrUrl: process.env.API_URL
});

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attemting toi deploy from account', accounts[0])
    const result = await new web3.eth.Contract(abi)
                        .deploy({data: evm.bytecode.object, arguments: ['Hi There!']})
                        .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();