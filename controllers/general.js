const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');


//HOME route
router.get('/', (req,res) =>{

    const expressions = {
      title: 'Home',
      categories: fakeDB.getCategories(),
      bestSellers: fakeDB.getBestSellingProducts(),
      loginEmail: req.query.loginEmail || " ",
      loginPassword: req.query.loginPassword || " ",
      loginTry: req.query.loginTry || false,
      loginModal: req.query.loginModal || false,
    }
  
    res.render('home', expressions)
  
  });


  module.exports = router;