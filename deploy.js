const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');

const provider = new HDWalletProvider(
    'proud school grace coyote wolf fancy destroy medal suit kid crack front',
    'https://rinkeby.infura.io/v3/f175b3f840aa4cd4a6486ad3457ae398'
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, 'bin', 'NightStarToken.abi');
const abi = fs.readFileSync(abiPath, 'utf8');

const byteCodePath = path.resolve(__dirname, 'bin', 'NightStarToken.bin');
const byteCode = fs.readFileSync(byteCodePath, 'utf8');

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from Account:', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(abi))
        .deploy({data: byteCode})
        .send({from: accounts[0], gas: '1000000'});
    
    console.log('Contract deployed to Address: ', result.options.address);
    exit(0);
}

deploy();