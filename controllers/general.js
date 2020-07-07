const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');


//HOME route
router.get('/', (req,res) =>{

    const expressions = {
      title: 'Home',
      categories: fakeDB.getCategories(),
      bestSellers: fakeDB.getBestSellingProducts()
    }
  
    res.render('home', expressions)
  
  });


  module.exports = router;