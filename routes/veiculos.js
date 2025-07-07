const express = require('express');
const router = express.Router();

const db = require("../db")

router.get('/new', (req, res, next) => {
  res.render('newVeiculo', { title: 'Cadastro de veiculos', veiculos:{}});
  
})

router.get('/', (req, res, next) => {
  db.findVeiculos()
  .then(veiculos => {
    res.render('veiculos', { title: 'Consecionaria', veiculos: veiculos, qty: veiculos.length});

  })
  .catch(error => {
    console.log(error)
    res.render("error", {message:"Nao foi possivel listar os veiculos, tente novamente mais tarde", error})});
  
});

router.post('/new', (req, res, next) => {
  const {tipo, marca, modelo, ano, preco, km, cambio, id} = req.body;

  if(!tipo || !marca || !modelo || !ano || !preco || !km && !/[0-9]+/.test(res.body))
    return res.redirect("/veiculos/new?error=0 campos obrigatorios!");

    //if(req.body.ano || req.body.preco || )
   //return res.redirect("/new?error=0 campos obrigatorios!");

  const veiculo = {tipo, marca, modelo, ano, preco, km, cambio}

  const promise = id ? db.updateVeiculo(id, veiculo) : db.insertVeiculo(veiculo);

  promise
  .then(result => {
    res.redirect("/veiculos");
    //res.render('index', { title: 'Consecionaria', veiculos: veiculo });

  })
  .catch(error => console.log(error));
})

router.get('/edit/:veiculoId', (req, res, next) => {
  const id = req.params.veiculoId;
  db.findVeiculo(id)
    .then(veiculo => {
      res.render('veiculos', {title: "Editar Veiculo", veiculo}) 
    })
    .catch(error => console.log(error));  
  
})

router.get('/delete/:veiculoId',(req, res, next) => {
  const id = req.params.veiculoId;
  db.deleteVeiculo(id)
    .then(result => {res.redirect("/")})
    .catch(error => console.log(error));  
})






module.exports = router;



