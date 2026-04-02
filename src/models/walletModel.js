const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  publicKey: String,
  balance: Number
});

module.exports = mongoose.model('Wallet', walletSchema);
