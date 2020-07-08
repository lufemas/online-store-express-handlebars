const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');

const user = require('../model/user')


// Products Page
router.get('/', (req,res) =>{

    const expressions = {
      title: 'Products',
      products : fakeDB.getAllProducts().reverse(),
      categories: fakeDB.getCategories(),
      
      userLogged    : user.logged,
      userName      : user.name,

      loginEmail: req.query.loginEmail || " ",
      loginPassword: req.query.loginPassword || " ",
      loginTry: req.query.loginTry || false,
      loginModal: req.query.loginModal || false,

      regName                    : req.query.regName || "", 
      regEmail                   : req.query.regEmail || "", 
      regPassword                : req.query.regPassword || "", 
      regConfirmPassword         : req.query.regConfirmPassword || "",
      regModal                   : req.query.regModal || false, 
      regTry                     : req.query.regTry || false, 
      regWarningName             : req.query.warningName || null , 
      regWarningEmail            : req.query.warningEmail || null , 
      regWarningPassword         : req.query.warningPassword || null , 
      regWarningPasswordConfirm  : req.query.warningPasswordConfirm || null , 
    }
  
    res.render('products',expressions)
  
  });
  
  router.get('/:category', (req,res) =>{
  
    const expressions = {
      title: 'Products',
      products : fakeDB.getProductsFromCategory(req.params.category),
      categories: fakeDB.getCategories(),

      userLogged    : user.logged,
      userName      : user.name,
      

      loginEmail: req.query.loginEmail || " ",
      loginPassword: req.query.loginPassword || " ",
      loginTry: req.query.loginTry || false,
      loginModal: req.query.loginModal || false,

      regName                    : req.query.regName || "", 
      regEmail                   : req.query.regEmail || "", 
      regPassword                : req.query.regPassword || "", 
      regConfirmPassword         : req.query.regConfirmPassword || "",
      regModal                   : req.query.regModal || false, 
      regTry                     : req.query.regTry || false, 
      regWarningName             : req.query.warningName || null , 
      regWarningEmail            : req.query.warningEmail || null , 
      regWarningPassword         : req.query.warningPassword || null , 
      regWarningPasswordConfirm  : req.query.warningPasswordConfirm || null , 
    }
  
  
    res.render('products',expressions)
  
  });

  module.exports = router;