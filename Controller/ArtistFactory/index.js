import dotenv from 'dotenv';
import { web3, myContract, contractAddress } from '../../server.js';
import { asyncMiddleware } from '../../utils/index.js';
dotenv.config();

const deployArtist = asyncMiddleware(async (req, res) => {
  const { from, amount, args } = req.body;
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 300000; // Adjust as needed
  const valueInWei = web3.utils.toWei(amount, 'ether');

  // Check if the sender account has enough balance
  const balance = await web3.eth.getBalance(from);
  console.log(balance, valueInWei)
  if (balance < valueInWei) {
    Object.assign(new Error("Insufficient balance"), { status: 400 });
  }

  // Create a transaction object with the necessary parameters
  const txObject = {
    from,
    to: contractAddress,
    value: valueInWei,
    gasPrice,
    gasLimit,
    data: myContract.methods.deployNFTCollection(...args).encodeABI(),
  };

  // Return the transaction object to the client for signing
  res.json({ success: true, txObject });
})

const signTransaction = asyncMiddleware(async (req, res) => {
  const { signedTx } = req.body;

  // Send the signed transaction to the Ethereum network
  const txReceipt = await web3.eth.sendSignedTransaction(signedTx);

  // Return the transaction receipt to the client
  res.json({ success: true, txReceipt });
})


export {
  deployArtist,
  signTransaction
}