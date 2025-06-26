const express = require('express');
const router = express.Router();

const db = require("../db")

router.get('/', (req, res, next) => {
  db.findVeiculos()
  .then(veiculos => {
    res.render('index', { title: 'Consecionaria', veiculos: veiculos });

  })
  .catch(error => console.log(error));
});

router.post('/new', (req, res, next) => {
  const {tipo, marca, modelo, ano, preco, km, id} = req.body;

  if(!tipo || !marca || !modelo || !ano || !preco || !km)
    return res.redirect("/new?error=0 campos obrigatorios!");

  if(req.body.ano || req.body.preco || req.body.km && !/[0-9]+/.test(res.body))
   return res.redirect("/new?error=0 campos obrigatorios!");

  const newVehicle = {tipo, marca, modelo, ano, preco, km}

  const promise = id ? db.updateVeiculo(id, newVehicle) : db.insertVeiculo(newVehicle);

  promise
  .then(result => {
    res.redirect("/");
    //res.render('index', { title: 'Consecionaria', veiculos: veiculos });

  })
  .catch(error => console.log(error));
});

router.get('/edit/:veiculoId', (req, res, next) => {
  const id = req.params.veiculoId;
  db.findVeiculo(id)
    .then(veiculo => {
      console.log(veiculo)
      res.render('veiculos', {title: "Editar", veiculo}) 
    })
    .catch(error => console.log(error));  
  
});

router.get('/new', (req, res, next) => {
  res.render('veiculos', { title: 'Cadastro de veiculos', veiculo:{}});
  
});




module.exports = router;



