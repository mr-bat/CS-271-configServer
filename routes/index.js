var express = require('express');
var router = express.Router();

const clients = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(clients);
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
  console.log(req.body);
  const { ip, port } = req.body;
  clients.push({ip, port});
  res.send("ok");
});

module.exports = router;
