const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');


// Products Page
router.get('/', (req,res) =>{

    const expressions = {
      title: 'Products',
      products : fakeDB.getAllProducts().reverse(),
      categories: fakeDB.getCategories(),
      loginEmail: req.query.loginEmail || " ",
      loginPassword: req.query.loginPassword || " ",
      loginTry: req.query.loginTry || false,
      loginModal: req.query.loginModal || false,

      regName             : req.query.regName || "", 
      regEmail            : req.query.regEmail || "", 
      regPassword         : req.query.regPassword || "", 
      regConfirmPassword  : req.query.regConfirmPasswor || "",
      regModal            : req.query.regModal || false, 
      regTry              : req.query.regTry || false, 
      regWarnings         : req.query.warnings || {} , 
    }
  
    res.render('products',expressions)
  
  });
  
  router.get('/:category', (req,res) =>{
  
    const expressions = {
      title: 'Products',
      products : fakeDB.getProductsFromCategory(req.params.category),
      categories: fakeDB.getCategories(),
      loginEmail: req.query.loginEmail || " ",
      loginPassword: req.query.loginPassword || " ",
      loginTry: req.query.loginTry || false,
      loginModal: req.query.loginModal || false,

      regName             : req.query.regName || "", 
      regEmail            : req.query.regEmail || "", 
      regPassword         : req.query.regPassword || "", 
      regConfirmPassword  : req.query.regConfirmPasswor || "",
      regModal            : req.query.regModal || false, 
      regTry              : req.query.regTry || false, 
      regWarnings         : req.query.warnings || {} , 
    }
  
  
    res.render('products',expressions)
  
  });

  module.exports = router;