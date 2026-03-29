const mongoose = require('../db');

const transactionSchema = new mongoose.Schema({
    from: String,
    to: String,
    amount: Number,
    signature: String,
    status: { type: String, default: "confirmed" },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
