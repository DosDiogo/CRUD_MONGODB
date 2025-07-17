const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../db")
const {findUserByName, findUserByEmail, generatePassword } = require("../auth");

/* GET home page*/
router.get('/', (req, res, next) => {
  res.render('login', {title:"Login", message:""});

});

router.post('/login', async (req, res, next) => {
  const name = req.body.name;
  const user = await findUserByName(name);

  if(!user) return res.render("login", {title: "Login", message:"Usuario ou senha inválidos."});

  const password = req.body.password;

  if(!bcrypt.compareSync(password, user.password)) return res.render("login", {title: "Login", message:"Usuario ou senha inválidos."});
  
  res.redirect('/index');
});

router.get('/forgot', async (req, res, next) => {
  
  return res.render("forgot", {title: "Forgot password", message:""});

});

router.post('/forgot', async (req, res, next) => {
  const email = req.body.email;
  if(!email) return res.render("forgot", {title: "Forgot password", message:"O email é obrigatório"});
  const user = await findUserByEmail(email);

  if(!user) return res.render("forgot", {title: "Forgot password", message:"O email não está cadastrado."});

  const newPassword = generatePassword();

  user.password = newPassword;

  await db.updateUser(user._id.toString(), user);
  
  res.render("forgot", {title: "Recueração de senha", message:"E-mail de recuperacao de senha enviado com sucesso!"});

});




module.exports = router;
