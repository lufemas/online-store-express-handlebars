const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');


// Products Page
router.get('/', (req,res) =>{

    const expressions = {
      title: 'Products',
      products : fakeDB.getAllProducts().reverse(),
      categories: fakeDB.getCategories()
    }
  
    res.render('products',expressions)
  
  });
  
  router.get('/:category', (req,res) =>{
  
    const expressions = {
      title: 'Products',
      products : fakeDB.getProductsFromCategory(req.params.category),
      categories: fakeDB.getCategories()
    }
  
  
    res.render('products',expressions)
  
  });

  module.exports = router;