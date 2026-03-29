require('./db');
const express = require('express');
const cors = require('cors');

const walletRoutes = require('./routes/walletRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/wallet', walletRoutes);
app.use('/tx', transactionRoutes);

app.get('/', (req, res) => {
    res.send('NUVIXO backend running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
