const express = require('express');
const router = express.Router();
//const { ObjectId} = require("mongodb");


const db = require("../db")

router.get('/new', (req, res) => {
  res.render('newVeiculo', { title: 'Cadastro de veiculos', veiculos:{}});
  
})

router.get('/edit/:veiculoId', (req, res) => {  
  
  const id = req.params.veiculoId;

  db.findVeiculo(id)
    .then(veiculos => {
      //const veiculos = [veiculo];
      console.log(veiculos);     
      res.render('newVeiculo', {title: "Editar Veiculo", veiculos}); 
      
    })
    .catch(error => {
      console.log(error)});  
  
})



router.post('/new', (req, res) => {
  const {tipo, marca, modelo, ano, preco, km, cambio, opcionais ,id} = req.body;
  
  if(!tipo || !marca || !modelo || !ano || !preco || !km && !/[0-9]+/.test(res.body))
    return res.redirect("/veiculos/new?error=0 campos obrigatorios!");
  
  //if(req.body.ano || req.body.preco || )
  //return res.redirect("/new?error=0 campos obrigatorios!");
  
  const veiculo = {tipo, marca, modelo, ano, preco, km, cambio, opcionais};
  console.log(veiculo);
  
  const promise = id ? db.updateVeiculo(id, veiculo) : db.insertVeiculo(veiculo);

  promise
  .then(result => {
    res.redirect("/veiculos");
    //res.render('index', { title: 'Consecionaria', veiculos: veiculo });

  })
  .catch(error => {
    console.log(error)});
})



router.get('/delete/:veiculoId',(req, res) => {
  const id = req.params.veiculoId;
  db.deleteVeiculo(id)
    .then(result => {res.redirect("/veiculos")})
    .catch(error => console.log(error));  
})


router.get('/', (req, res) => {
  db.findVeiculos()
  .then(veiculos => {
    res.render('veiculos', { title: 'Consecionaria', veiculos, qty: veiculos.length});

  })
  .catch(error => {
    console.log(error)
    res.render("error", {message:"Nao foi possivel listar os veiculos, tente novamente mais tarde", error})});
  
});

/*

router.get('/:page?', async (req, res) => {
  const page = parseInt(req.params.page);
  try {
    //const qty = await db.countVeiculos();
    
    //const veiculos =  await db.findVeiculos(page);
    res.render('veiculos', { title: 'Consecionaria', veiculos, qty});
  } catch (error) {
    console.log(error);
    res.render("error", {message:"Nao foi possivel listar os veiculos, tente novamente mais tarde", error})
    
  }

});

*/
module.exports = router;



