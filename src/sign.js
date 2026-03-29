const { sign } = require('./utils/crypto')
;
const tx = { from: "04975758bf1bb8f80d4cf50201a0c9817fff2cbd8ed59529174e386c5855a86dc1b72fad7553d18c38ccefaeb3ba512388fcaa23c2d300c7e283d29a77feb15dd4",
             to: "04797aea7a1e6083630bba37b885f21f562b6e7225cfe05db6fbd848e8cdc6d565e24184a4974f3de374f81291ca5a70fe0ee250f39c907f89e17400ea05521ef3",
             amount: 10
};

const privateKey = "5114e6db7d6163f07da9d5de823665f8ab47b0627a6ec4781199d963d9fcc4a6";

const signature = sign(tx, privateKey);

console.log("Signature:", signature);
