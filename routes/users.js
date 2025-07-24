const express = require('express');
const router = express.Router();
const db = require("../db");
const sendMail = require("../mail");

router.get('/new', (req, res) => {
  res.render('newUser', { title: 'Cadastro de nuevos usuários', user:[]});
  
})

router.get('/edit/:userId', (req, res) => {  
  
  const id = req.params.userId;

  db.findUser(id)
    .then(user => {
      
      res.render('editUser', {title: "Editar usuário", user}); 
      
    })
    .catch(error => {
      console.log(error)});  
  
})

router.post('/new', async (req, res) => {

  const {name, email, password, id} = req.body;
  
  if(!name || !email || !password) return res.redirect("/users/new?error= campos obrigatorios!");
  
  const user = {name, email, password};

  try {

  await id ? db.updateUser(id, user) : db.insertUser(user);
    
  await sendMail(user.email, "Bem vindo a sistema DevDÓS",`
          Bem-vindo ${user.name}!
       
          Sua conta foi criada com sucesso.
      
          Att,
      
          DevDÓS Support.`);

  res.redirect("/");
    
  } catch (error) {
    console.error(error);
    res.redirect("/users/new?error=" + error.message);
  }

})  

router.get('/delete/:userId',(req, res) => {
  const id = req.params.userId;
  db.deleteUser(id)
    .then(result => {res.redirect("/users")})
    .catch(error => console.log(error));  
})

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

