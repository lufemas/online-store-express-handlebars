const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');
const url = require('url');    

//HOME route
router.post('/login', (req,res) =>{

    const {email, password, currentRoute} = req.body;
    const expressions = {
      title: 'Home',
      categories: fakeDB.getCategories(),
      bestSellers: fakeDB.getBestSellingProducts()
    }

    console.log(req.body)
    console.log(req.url)
  
    // res.render('home', expressions)
    // res.redirect(currentRoute)

    res.redirect(url.format({
      pathname:currentRoute,
      query: {
         "loginEmail": email,
         "loginModal": true
       }
    }));
  
  });


  module.exports = router;