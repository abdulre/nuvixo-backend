const Wallet = require('../models/walletModel');
const Transaction = require('../models/transactionModel');

async function createAccount(address) {
    let wallet = await Wallet.findOne({ publicKey: address });

    if (!wallet) {
        wallet = new Wallet({
            publicKey: address,
            balance: 100
        });
        await wallet.save();
    }

    return wallet;
}

async function getBalance(address) {
    const wallet = await Wallet.findOne({ publicKey: address });
    return wallet ? wallet.balance : 0;
}

async function transfer(from, to, amount, signature, status = "confirmed", nonce) {
    const sender = await Wallet.findOne({ publicKey: from });

    if (!sender) return false;

    // 🔐 Nonce check
    if (nonce !== sender.nonce + 1) {
        return false;
    }

    if (sender.balance < amount) {
        return false;
    }

    let receiver = await Wallet.findOne({ publicKey: to });

    if (!receiver) {
        receiver = new Wallet({ publicKey: to, balance: 0 });
    }

    if (status === "confirmed") {
        sender.balance -= amount;
        receiver.balance += amount;
        sender.nonce += 1;

        await sender.save();
        await receiver.save();
    }

    await Transaction.create({
        from,
        to,
        amount,
        signature,
        status
    });

    return true;
}

async function confirmPendingTransactions() {
    const pendingTxs = await Transaction.find({ status: "pending" });

    for (let tx of pendingTxs) {
        const sender = await Wallet.findOne({ publicKey: tx.from });

        if (!sender || sender.balance < tx.amount) {
            continue; // skip invalid
        }

        let receiver = await Wallet.findOne({ publicKey: tx.to });

        if (!receiver) {
            receiver = new Wallet({ publicKey: tx.to, balance: 0 });
        }

        sender.balance -= tx.amount;
        receiver.balance += tx.amount;

        await sender.save();
        await receiver.save();

        tx.status = "confirmed";
        await tx.save();
    }

    return { processed: pendingTxs.length };
}

module.exports = {
    createAccount,
    getBalance,
    transfer,
    confirmPendingTransactions
};
