const express = require('express');
const router = express.Router();

const db = require("../db")

/* GET home page. 
router.get('/', (req, res, next) => {
  db.findCustomers()
  .then(veiculos => {
    console.log(veiculos);
    res.render('index', { title: 'Consecionaria', veiculos: veiculos });

  })
  .catch(error => console.log(error));
});

*/

module.exports = router;
