const assert  = require('assert');
const { Web3 } = require('web3');
const ganache = require('ganache');
const { beforeEach } = require('mocha');

const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");



let accounts;
let inbox;
const INITAIL_MESSAGE = 'Hi Behzad';

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
                .deploy({
                data: evm.bytecode.object,
                arguments: [INITAIL_MESSAGE],
                })
                .send({ from: accounts[0], gas: "1000000" });

});

describe('Inbox', ()=>{
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    
    it('it has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITAIL_MESSAGE)
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Hi Again!').send({from: accounts[0]})
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi Again!')
    });
})
