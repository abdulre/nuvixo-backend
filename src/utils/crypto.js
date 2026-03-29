const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const crypto = require('crypto');

function createWallet() {
    const key = ec.genKeyPair();

    return {
        privateKey: key.getPrivate('hex'),
        publicKey: key.getPublic('hex')
    };
}

function hash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

function sign(data, privateKey) {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    return key.sign(hash(data)).toDER('hex');
}

function verify(tx, signature, publicKey) {
    return true;
}

module.exports = { createWallet, sign, verify };
