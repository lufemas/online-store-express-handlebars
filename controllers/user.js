const express = require('express');
const router = express.Router();
const fakeDB  = require('../model/Products');
const url = require('url');    

const { isObjEmpty } = require('../jr-node-utils');


//HOME route
router.post('/login', (req,res) =>{

    const {email, password, currentRoute} = req.body;

    console.log(req.body)
    console.log(req.url)

    if(email == "" || password == "" ){
      console.log('WRONG')

      res.redirect(url.format({
        pathname:currentRoute,
        query: {
          "loginEmail": String(email),
          "loginPassword": String(password),
          "loginModal": true,
          "loginTry": true,
        }
      }));

    }else{
      // LOGGED ROUTE
      res.redirect(currentRoute)
    }
  
  });

  router.post('/register', (req,res) =>{

    const {name,email, password, confirmPassword, currentRoute} = req.body;
    const warnings = {}
    console.log(req.body)

    if( !isObjEmpty(warnings)) console.log('warnings')

    if (String(email).match(/^\w+@\w+[.]\w+/)){
      console.log("email matches!")
    }

    if (String(password).match(/^\w{6,12}$/)){
      console.log("password matches!")
    }

    if(email == "" || password == "" ){
      console.log('WRONG')

      res.redirect(url.format({
        pathname:currentRoute,
        query: {
          "regName": String(name),
          "regEmail": String(email),
          "regPassword": String(password),
          "regConfirmPassword": String(confirmPassword),
          "regModal": true,
          "regTry": true,
          "warning" : warnings
        }
      }));

    }else{
      // LOGGED ROUTE
      res.redirect(currentRoute)
    }
  
  });

  module.exports = router;