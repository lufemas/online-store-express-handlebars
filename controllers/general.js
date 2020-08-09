const express = require('express');
const router = express.Router();
const productModel  = require('../models/Product');
const categoryModel  = require('../models/Category');



//HOME route
router.get('/', (req,res) =>{

  productModel.find({isBestSelling : true})
  .then( bestSellers => {

    categoryModel.find({})
    .then( categories => {
      console.log(categories)
      const expressions = {
        title: 'Products',
        bestSellers: bestSellers.map( bestSeller => bestSeller.toObject()),
        categories: categories.map( category => category.toObject()),
        
        // userLogged    : user.logged,
        // userName      : user.name,
  
        // user: req.session.userInfo,
  
        loginEmail: req.query.loginEmail || " ",
        loginPassword: req.query.loginPassword || " ",
        loginTry: req.query.loginTry || false,
        loginModal: req.query.loginModal || false,
        error         : req.query.error || '',
  
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
    
      res.render('home',expressions)

    })


  })
  
  });


  module.exports = router;