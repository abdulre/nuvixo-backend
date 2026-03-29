const express = require('express'); const router = express.Router();

const { verify } = require('../utils/crypto');
const { transfer, confirmPendingTransactions } = require('../services/ledgerService');
const Transaction = require('../models/transactionModel');

// Send transaction
router.post('/send', async (req, res) => {
    const { from, to, amount, signature, status, nonce } = req.body;

    const tx = { from, to, amount, nonce };

    if (!verify(tx, signature, from)) {
        return res.json({ success: false, error: "Invalid signature" });
    }

    const success = await transfer(from, to, amount, signature, status, nonce);

    res.json({ success });
});

// Get all transactions
router.get('/all', async (req, res) => {
    const txs = await Transaction.find().sort({ timestamp: -1 });
    res.json(txs);
});

// Get wallet history
router.get('/history/:address', async (req, res) => {
    const address = req.params.address;

    const txs = await Transaction.find({
        $or: [
            { from: address },
            { to: address }
        ]
    }).sort({ timestamp: -1 });

    res.json(txs);
});

// Sync pending → confirmed
router.post('/sync', async (req, res) => {
    const result = await confirmPendingTransactions();
    res.json(result);
});

module.exports = router;
