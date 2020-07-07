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

   
    String(name) == ''                          ? console.log("name is valid.")    : warnings.name             = `Enter a valid name`
    String(email).match(/^.+@\w+[.].+$/)        ? console.log("email is valid.")   : warnings.email             = `Enter a valid email`
    String(password).match(/^\w{6,12}$/)        ? console.log("password is valid") : warnings.password          = `Enter a valid password`
    String(password) == String(confirmPassword) ? console.log("passwords matches") : warnings.passwordConfirm   = `Password doesn't match`


    if(isObjEmpty(warnings)){
      // LOGGED ROUTE
      res.redirect(currentRoute)
    }else{
   
      console.log('WRONG')
      console.log(warnings)

      res.redirect(url.format({
        pathname:currentRoute,
        query: {
          "regName": String(name),
          "regEmail": String(email),
          "regPassword": String(password),
          "regConfirmPassword": String(confirmPassword),
          "regModal": true,
          "regTry": true,
          "warningEmail" : warnings.email || null,
          "warningPassword" : warnings.password || null,
          "warningPasswordConfirm" : warnings.passwordConfirm || null,
          "warningName" : warnings.name || null,
        }
      }));
    }
  
  });

  module.exports = router;