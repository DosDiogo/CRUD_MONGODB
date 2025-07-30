const express = require('express');
const router = express.Router();

const db = require("../db")

/* GET home page*/
router.get('/', (req, res, next) => {
  res.render('index', {title:"Bem-Vindo ao sistema de gestao de veiculos.", userProfile: parseInt(req.user.profile)});

});




module.exports = router;
