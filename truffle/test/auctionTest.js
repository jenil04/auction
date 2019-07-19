const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider(); 
const web3 = new Web3(provider); 
const { interface, bytecode } = require('../compile');

let accounts;
let auction;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts(); 
	auction = await new web3.eth.Contract(JSON.parse(interface)) 
		.deploy({
			data: bytecode
		})
		.send({ 
			from: accounts[0],
			gas: '1000000'
		});
	auction.setProvider(provider);
});

describe('Auction Contract', () => {
	it('deploys a contract', () => {
		assert.ok(auction.options.address); 
	});

	it('has a seller', async () => {
		const seller = await auction.methods.seller().call({
			from: accounts[0]
		}); 
		assert.equal(seller, accounts[0]);
	});

	it('can enter one account', async () => {
		await auction.methods.submitBid().send({ 
			from: accounts[1], 
			value: web3.utils.toWei('0.02', 'ether') 
		});
		const bidders = await auction.methods.getBidders().call({ 
			from: accounts[0] 
		});
		assert.equal(1, bidders.length);
		assert.equal(accounts[1], bidders[0]);
	});

	it('can enter mutiple accounts', async () => {
		await auction.methods.submitBid().send({ 
			from: accounts[1], 
			value: web3.utils.toWei('0.02', 'ether') 
		});
		await auction.methods.submitBid().send({ 
			from: accounts[2], 
			value: web3.utils.toWei('0.02', 'ether') 
		});
		await auction.methods.submitBid().send({ 
			from: accounts[3], 
			value: web3.utils.toWei('0.02', 'ether') 
		});
		const bidders = await lottery.methods.getBidders().call({ 
			from: accounts[0] 
		});

		assert.equal(3, bidders.length);
		assert.equal(bidders[0], accounts[1]);
		assert.equal(bidders[1], accounts[2]);
		assert.equal(bidders[2], accounts[3]);
	});

	it('requires a min amount of ether to enter', async () => {
		try {
			await auction.methods.submitBid().send({ 
				from: accounts[0],
				value: 100 
			});
			assert(false);
		} catch(err) {
			assert(err); 
		}
	});

	it('transfer balance from highest bidder and resets bidders array', async () => {
		await auction.methods.submitBid().send({ 
			from: accounts[4], 
			value: web3.utils.toWei('2', 'ether') 
		});

		const initialBalance = await web3.eth.getBalance(accounts[4]);

		await auction.methods.determineWinner().send({
			from: accounts[0]
		})

		const finalBalance = await web3.eth.getBalance(accounts[4]);

		assert.equal(web3.utils.toWei('2', 'ether'), finalBalance-initialBalance);
	});
});
