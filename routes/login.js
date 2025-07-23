const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../db");
const sendMail = require("../mail");
const {findUserByName, findUserByEmail, generatePassword } = require("../auth");

/* GET home page*/
router.get('/', (req, res, next) => {
  res.render('login', {title:"Login", message:""});

});

router.post('/login', async (req, res, next) => {
  let {email, password} = req.body;
  const user = await findUserByEmail(email);

  if(!user) return res.render("login", {title: "Login", message:"Usuario ou senha inválidos."});

  password = req.body.password;

  if(!bcrypt.compareSync(password, user.password)) return res.render("login", {title: "ogin", message:"Usuario ou senha inválidos."});
  
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

  
  
  try {
    await db.updateUser(user._id.toString(), user);

    await sendMail(user.email, "Senha alterada com sucesso",`
        Olá ${user.name}!
        Sua senha foi alterada com sucesso!
        
        Sua nova senha é -> ${newPassword}
        
        Use-a para se autenticar noavemente em SITE.
  
        Att,
  
        DevDÓS Support.
      `);
      
    res.redirect("/");
    
  } catch (error) {
    console.error(error);
    res.render("forgot", {title: "Recueração de senha", message:error.message});
  }



});




module.exports = router;
