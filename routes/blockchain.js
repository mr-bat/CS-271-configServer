const { getNumberOfClients } = require('./index');
var express = require('express');
var router = express.Router();

const blocks = [];

const getBalance = (id) => {
    const balance = {};

    blocks.forEach(block => {
        const { amount, from, to } = block;

        balance[from] = (balance[from] || 0) - amount;
        balance[to] = (balance[to] || 0) + amount;
    });
    console.log("balance:", balance);

    return balance[id] + 10;
};

const addTransaction = (from = -1, to = -1, amount = -1) => {
    console.log("# of clients:", getNumberOfClients(), "from", from, "to", to, "amount", amount);

    if (
	(from <= 0 || from > getNumberOfClients()) ||
	(to <= 0 || to > getNumberOfClients()) ||
            (amount < 0)
       )
        return false;
    if (getBalance(from) < amount)
        return false;

    blocks.push({ from, to, amount });
    return true;
};

router.post('/balance/', function(req, res) {
    const { id } = req.body;
    res.json({ id, amount: (getBalance(id) || 0).toString() });
});

router.post('/new/', function (req, res) {
    const { from, to, amount } = req.body;
    if (addTransaction(parseInt(from), parseInt(to), parseInt(amount)))
        res.sendStatus(200);
    else
        res.sendStatus(400);
});

router.post('/reset/', function (req, res) {
    blocks.splice(0);
    res.sendStatus(200);
});

module.exports = router;
