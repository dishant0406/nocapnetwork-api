import dotenv from 'dotenv';
import { web3, myContract, contractAddress } from '../../server.js';
dotenv.config();

const deployArtist = async (req, res) => {
  try {
    const { from, amount, args } = req.body;
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000; // Adjust as needed
    const valueInWei = web3.utils.toWei(amount, 'ether');

    // Check if the sender account has enough balance
    const balance = await web3.eth.getBalance(from);
    console.log(balance, valueInWei)
    if (balance < valueInWei) {
      return res.status(400).json({ success: false, error: 'Insufficient balance' });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

const signTransaction = async (req, res) => {
  try {
    const { signedTx } = req.body;

    // Send the signed transaction to the Ethereum network
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx);

    // Return the transaction receipt to the client
    res.json({ success: true, txReceipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}


export {
  deployArtist,
  signTransaction
}