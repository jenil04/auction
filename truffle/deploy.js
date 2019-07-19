const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider( 
	'resemble liquid various present carpet talent soap opera owner remain erase river embody bracket unhappy',
	'rinkeby.infura.io/v3/d662bdba98174b5a9b7c40c6fd631314' )

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log(`attempting to deploy from account ${accounts[0]}`);
	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: '0x' + bytecode })
		.send({ from: accounts[0] });
	console.log(interface);
	console.log(`contract deployed to ${result.options.address}`);
}
deploy();