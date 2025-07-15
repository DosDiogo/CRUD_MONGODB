const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET users listing. 
router.get('/', (req, res, next) => {
  res.render('users',  {title: 'Cadastro de nuevos usuários',qty:[3], users:[1,2]});
});

*/


router.get('/new', (req, res) => {
  res.render('newUser', { title: 'Cadastro de nuevos usuários', user:[]});
  
})

router.get('/edit/:userId', (req, res) => {  
  
  const id = req.params.userId;

  db.findUser(id)
    .then(user => {
      
      res.render('newUser', {title: "Editar usuário", user}); 
      
    })
    .catch(error => {
      console.log(error)});  
  
})

router.post('/new', (req, res) => {
  const {name, email, password, id} = req.body;
  
  if(!name || !email || !password)
    return res.redirect("/user/new?error= campos obrigatorios!");
  
  const user = {name, email, password};
 
  
  const promise = id ? db.updateUser(id, user) : db.insertUser(user);

  promise
  .then(result => {
    res.redirect("/users");
    //res.render('index', { title: 'Consecionaria', veiculos: veiculo });

  })
  .catch(error => {
    console.log(error)});
})



router.get('/delete/:userId',(req, res) => {
  const id = req.params.userId;
  db.deleteVeiculo(id)
    .then(result => {res.redirect("/users")})
    .catch(error => console.log(error));  
})

/*
router.get('/', (req, res) => {
  db.findVeiculos()
  .then(veiculos => {
    res.render('veiculos', { title: 'Consecionaria', veiculos, qty: veiculos.length});

  })
  .catch(error => {
    console.log(error)
    res.render("error", {message:"Nao foi possivel listar os veiculos, tente novamente mais tarde", error})});
  
});

*/


router.get('/{:pages}', async (req, res, next) => {
  
  const page = parseInt(req.query.pages) || 1 ;
  const limite = parseInt(req.query.limite) || 5;
  const skip = (page - 1) * limite;   
  try {
    const qty = await db.countUsers();
 
    const pagesQty = Math.ceil(qty/limite);  

    const users =  await db.findUsers(skip, limite);
   

    res.render('users', { title: 'Usuários', users, qty, pagesQty, page});
  } catch (error) {
    console.log(error);
    res.render("error", {message:"Nao foi possivel listar os usuários, tente novamente mais tarde", error})
    
  }

});

module.exports = router;

