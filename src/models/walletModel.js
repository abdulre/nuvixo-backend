const mongoose = require('../db');

const walletSchema = new mongoose.Schema({
    publicKey: String,
    balance: Number,
    nonce: { type: Number, default: 0 }
});

module.exports = mongoose.model('Wallet', walletSchema);
