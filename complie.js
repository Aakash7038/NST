const path = require('path');
const fs = require('fs');
const solc = require('solc');

const nightStarTokenPath = path.resolve(__dirname, 'contracts', 'NightStarToken.sol');
const source = fs.readFileSync(nightStarTokenPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'NightStarToken.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['NightStarToken.sol']['NightStarToken'];

var dirName = 'bin';
const contractByteCodePath = path.join(dirName, 'NightStarToken.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, 'NightStarToken.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));
