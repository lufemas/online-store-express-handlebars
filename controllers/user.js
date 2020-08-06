const express = require('express');
const router = express.Router();
const fakeDB  = require('../models/Products');
const url = require('url');    
const path = require("path");
const bcrypt = require("bcryptjs");

const { isObjEmpty } = require('../jr-node-utils');
const userModel = require('../models/user');


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

      // const user = require('../models/user')

      // user.logIn(String(email))

      // LOGGED ROUTE
      res.redirect(currentRoute)
    }
  
  });

  router.post('/register', (req,res) =>{

    const {name,email, password, confirmPassword, currentRoute} = req.body;

    

    const warnings = {}
    console.log(req.body)

   
    String(name).length > 0                     ? console.log("name is valid.")    : warnings.name              = `Enter a valid name`
    String(email).match(/^.+@\w+[.].+$/)        ? console.log("email is valid.")   : warnings.email             = `Enter a valid email`
    String(password).match(/^\w{6,12}$/)        ? console.log("password is valid") : warnings.password          = `Enter a valid password`
    String(password) == String(confirmPassword) ? console.log("passwords matches") : warnings.passwordConfirm   = `Password doesn't match`

    userModel.findOne( {email} )
    .then((regUser)=>{
        console.log('regUser')
        console.log(regUser)
        if(regUser){
           warnings.email = 'Email already in use.'
        }

        if(isObjEmpty(warnings)){
    
          const newUser = {
            name,
            email,
            password
          }
      
      
          console.log(newUser)
      
          const user = new userModel(newUser)
    
          user.save()
          .then( user => {
    
              console.log(process.env.SENDGRID_API_KEY)
              // using Twilio SendGrid's v3 Node.js Library
              // https://github.com/sendgrid/sendgrid-nodejs
              const sgMail = require('@sendgrid/mail');
              sgMail.setApiKey(process.env.SENDGRID_API_KEY);
              const msg = {
                to: String(email),
                from: "maschietto.jr@gmail.com",
                subject: 'Your FakeAmazon account was created',
                html: `<h2>Welcome to FakeAmazon ${name}</h2>
                <p> Your account was created successfully</p>
                
                <a href="#">Go to FakeAmazon</a>`,
              };
              sgMail.send(msg)
              .then(()=>{
                
                // const user = require('../models/user')
        
                // user.logIn(String(name))
        
                // LOGGED ROUTE
                // res.redirect(currentRoute)
                res.redirect(`dashboard/${user._id}`)
              })
              .catch((err)=> {
                console.error(err)
                if (err.response) {
                  // Extract error msg
                  const {message, code, response} = err;
              
                  // Extract response msg
                  const {headers, body} = response;
              
                  console.error(body);
                }
              
              })     
          } )
          .catch( err => console.log('Error saving user data on DataBase : ' + err))
    
          
    
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

    })
    

  
  });

  router.get('/dashboard/:id', (req, res) => {
    userModel.findOne({ _id: req.params.id})
    .then( user => {
      
      const expressions = {
        user
      }
  
      res.render('dashboard',user)
    })




  })

  module.exports = router;