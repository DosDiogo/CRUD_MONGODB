const express = require('express');
const router = express.Router();

const db = require("../db")

/* GET home page*/
router.get('/', (req, res, next) => {
  res.render('index', {title:"Bem-Vindo ao sistema de gestao de veiculos."});
  /*db.findVeiculos()
  .then(veiculos => {
    console.log(veiculos);
    res.render('index', { title: 'Consecionaria', veiculos: veiculos });

  })
  .catch(error => console.log(error));

  */
});




module.exports = router;
