const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// private key
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// calculate public key
const myWalletAddress = myKey.getPublic('hex');

const firstCoin = new Blockchain();

// Mine first block
firstCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
firstCoin.addTransaction(tx1);

// Mine block
firstCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
firstCoin.addTransaction(tx2);

// Mine block
firstCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of xavier is ${firstCoin.getBalanceOfAddress(myWalletAddress)}`);

// firstCoin.chain[1].transactions[0].amount = 1;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', firstCoin.isChainValid() ? 'Yes' : 'No');
