var express = require('express');
var router = express.Router();

const clients = [];
module.export = clients;

router.get('/', function(req, res, next) {
  res.json(clients);
});

router.post('/', function (req, res) {
  console.log(req.body);
  const { ip, port } = req.body;
  const ind = clients.find(e => e.ip === ip && e.port === port);
  if (!ind) {
        clients.push({ip, port});
  }
  res.send("ok");
});

router.put('/', function (req, res) {
  console.log(req.body);
  const { ip, port } = req.body;
  const ind = clients.find(e => e.ip === ip && e.port === port);
  if (ind) {
	clients.splice(ind, 1);
  }
  res.send("removed");
});

module.exports = {
  router,
  getNumberOfClients: () => clients.length,
};
