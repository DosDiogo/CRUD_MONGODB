module.exports = (req, res, next) => {

  if(req.isAuthenticated()) return next();

  res.render("login",{title:"Login", message:"Atentica-se para ver a página."});

}
