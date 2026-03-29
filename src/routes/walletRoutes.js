const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

// test route (VERY IMPORTANT)
router.get('/test', (req, res) => {
    res.send('wallet route working');
});

// create wallet
router.post('/create', (req, res) => {
    const { publicKey } = req.body;
    res.json({ success: true, publicKey });
});

// get balance
router.get('/balance/:address', async (req, res) => {
    try {
        const address = req.params.address;

        const sent = await Transaction.find({ from: address });
        const received = await Transaction.find({ to: address });

        let balance = 0;

        for (let tx of received) balance += tx.amount;
        for (let tx of sent) balance -= tx.amount;

        res.json({ balance });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
