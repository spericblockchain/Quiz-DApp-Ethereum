
// Server Side Signing
const Tx = require('ethereumjs-tx').Transaction

module.exports.sendTransaction = function (
  methodCall,
  addressfrom,
  privatekey,
  cb
) {
  const encodedABI = methodCall.encodeABI();
  console.log("TCL: privatekey", privatekey)
  const privatekeyHex = Buffer.from(privatekey, 'hex');
  console.log("TCL: privatekeyHex", privatekeyHex)
  web3.eth.getGasPrice().then(gPrize => {
    web3.eth.getTransactionCount(addressfrom).then(txCount => {
    console.log("TCL: txCount", txCount)
      web3.eth.getBlock('latest').then(block => {
        var TxData = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(block.gasLimit),
          gasPrice: web3.utils.toHex(gPrize * 50),
          from: addressfrom,
          to: contractAddress,
          data: encodedABI
        };
        const transaction = new Tx(TxData);
        transaction.sign(privatekeyHex);
        const serializedtx = transaction.serialize().toString('hex');
        web3.eth
          .sendSignedTransaction('0x' + serializedtx)
          .on('transactionHash', hash => {
            console.log('TransactionHash: ' + hash);
          })
          .on('receipt', receipt => {
            console.log('Receipt: ', receipt);
            cb(true);
          })
          .on('error', error => {
            console.log('Error: ', error);
            cb(false);
          })
          .catch(error => {
            console.log('web3 exception Handled: \n', error);
          });
      });
    });
  });
};
