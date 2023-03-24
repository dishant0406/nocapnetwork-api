import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { Schema } = mongoose

const WalletSchema = new Schema({
  walletAddress: {
    type: String,
  },
  email: {
    type: String,
  }
})

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;