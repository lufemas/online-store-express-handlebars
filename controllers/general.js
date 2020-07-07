const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');


//HOME route
router.get('/', (req,res) =>{

    console.log("req.query.warnings")
    console.log(req.query.warnings)
    console.log("req.query")
    console.log(req.query)

    const expressions = {
      title: 'Home',
      categories    : fakeDB.getCategories(),
      bestSellers   : fakeDB.getBestSellingProducts(),
      loginEmail    : req.query.loginEmail || " ",
      loginPassword : req.query.loginPassword || " ",
      loginTry      : req.query.loginTry || false,
      loginModal    : req.query.loginModal || false,

      regName                    : req.query.regName || "", 
      regEmail                   : req.query.regEmail || "", 
      regPassword                : req.query.regPassword || "", 
      regConfirmPassword         : req.query.regConfirmPasswor || "",
      regModal                   : req.query.regModal || false, 
      regTry                     : req.query.regTry || false, 
      regWarningName             : req.query.warningName || null , 
      regWarningEmail            : req.query.warningEmail || null , 
      regWarningPassword         : req.query.warningPassword || null , 
      regWarningPasswordConfirm  : req.query.warningPasswordConfirm || null , 
    }      
  
    res.render('home', expressions)
  
  });


  module.exports = router;