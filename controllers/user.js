const express = require("express");
const router = express.Router();
const fakeDB = require("../models/Product");
const url = require("url");
const path = require("path");
const bcrypt = require("bcryptjs");

const isAuthenticated = require('../middleware/authentication')
const {dashBoardLoader, adminOnly} = require('../middleware/authorization')

const { isObjEmpty } = require("../jr-node-utils");
const userModel = require("../models/User");
const session = require("express-session");
const productModel = require("../models/Product");
const { Mongoose } = require("mongoose");
const isLoggedIn = require("../middleware/authentication");

//LOGIN route
router.post("/login", (req, res) => {
  // ///////////////////

  const { email, password, currentRoute } = req.body;

  console.log(req.body);
  console.log(req.url);

  if (email == "" || password == "") {
    console.log("WRONG");

    res.redirect(
      url.format({
        pathname: currentRoute,
        query: {
          loginEmail: String(email),
          loginPassword: String(password),
          loginModal: true,
          loginTry: true,
        },
      })
    );
  } else {
    /////////////////////////////////////

    userModel
      .findOne({ email: req.body.email })
      .then((user) => {
        const error = "";

        //email not found
        if (user == null) {
          const error = "Email and/or Password incorrect";

          console.log(req.body);
          console.log(req.url);

          console.log("WRONG email/pwd");
          res.redirect(
            url.format({
              pathname: currentRoute,
              query: {
                error,
                loginEmail: String(email),
                loginPassword: String(password),
                loginModal: true,
                loginTry: true,
              },
            })
          );
        }
        //email is found
        else {
          console.log("BCRYPT");

          bcrypt
            .compare(req.body.password, user.password)
            .then((isMatched) => {
              if (isMatched) {
                req.session.userInfo = user;

                // if(req.session.userInfo.cart.length <= 0 ) req.session.userInfo.cart

                res.redirect("/user/auth");
              } else {
                const error = "Email and/or Password incorrect";

                console.log(req.body);
                console.log(req.url);

                console.log("WRONG");

                res.redirect(
                  url.format({
                    pathname: currentRoute,
                    query: {
                      error,
                      loginEmail: String(email),
                      loginPassword: String(password),
                      loginModal: true,
                      loginTry: true,
                    },
                  })
                );
              }
            })
            .catch((err) => console.log(`Error ${err}`));
        }
      })
      .catch((err) => console.log(`Error ${err}`));

    /////////////////////////////////////

  }
});


// router.get("/profile",isAuthenticated,dashBoardLoader);

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword, currentRoute } = req.body;

  const warnings = {};
  console.log(req.body);

  String(name).length > 0                       ? console.log("name is valid.")       : (warnings.name = `Enter a valid name`);
  String(email).match(/^.+@\w+[.].+$/)          ? console.log("email is valid.")      : (warnings.email = `Enter a valid email`);
  String(password).match(/^\w{6,12}$/)          ? console.log("password is valid")    : (warnings.password = `Enter a valid password`);
  String(password) == String(confirmPassword)   ? console.log("passwords matches")    : (warnings.passwordConfirm = `Password doesn't match`);

  userModel.findOne({ email }).then((regUser) => {
    console.log("regUser");
    console.log(regUser);
    if (regUser) {
      warnings.email = "Email already in use.";
    }

    if (isObjEmpty(warnings)) {
      const newUser = {
        name,
        email,
        password,
      };

      console.log(newUser);

      const user = new userModel(newUser);

      user
        .save()
        .then((user) => {
          console.log(process.env.SENDGRID_API_KEY);
          // using Twilio SendGrid's v3 Node.js Library
          // https://github.com/sendgrid/sendgrid-nodejs
          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: String(email),
            from: "maschietto.jr@gmail.com",
            subject: "Your FakeAmazon account was created",
            html: `<h2>Welcome to FakeAmazon ${name}</h2>
                <p> Your account was created successfully</p>
                
                <a href="#">Go to FakeAmazon</a>`,
          };
          sgMail
            .send(msg)
            .then(() => {
              // const user = require('../models/user')

              // user.logIn(String(name))

              // LOGGED ROUTE
              // res.redirect(currentRoute)
              req.session.userInfo = user
              res.redirect(`auth`);
            })
            .catch((err) => {
              console.error(err);
              if (err.response) {
                // Extract error msg
                const { message, code, response } = err;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
              }
            });
        })
        .catch((err) =>
          console.log("Error saving user data on DataBase : " + err)
        );
    } else {
      console.log("WRONG");
      console.log(warnings);

      res.redirect(
        url.format({
          pathname: currentRoute,
          query: {
            regName: String(name),
            regEmail: String(email),
            regPassword: String(password),
            regConfirmPassword: String(confirmPassword),
            regModal: true,
            regTry: true,
            warningEmail: warnings.email || null,
            warningPassword: warnings.password || null,
            warningPasswordConfirm: warnings.passwordConfirm || null,
            warningName: warnings.name || null,
          },
        })
      );
    }
  });
});

router.get("/auth",isAuthenticated,dashBoardLoader);

// router.get("/dashboard/:id", (req, res) => {
//   userModel.findOne({ _id: req.params.id }).then((user) => {
//     const expressions = {
//       user,
//     };

//     res.render("dashboard", user);
//   });
// });

router.get("/logout", isLoggedIn,(req,res)=>{

  req.session.destroy();
  res.redirect("/")
  
})

router.get('/cart', isLoggedIn, (req,res)=>{

  if(req.session.userInfo.cart.length <= 0){
    res.render('cart')


  }else{

    const cart = req.session.userInfo.cart
  
    // const cartMongIds = cart.map( item=> new Mongoose().Types.ObjectId (item.id))
  
    cart.forEach( (item, ind) =>{
      productModel.findOne({_id: item.id})
      .then(product =>{
  
        item.name = product.name
        item.price = product.price
        item.category = product.category
        item.description = product.description
        item.imgSrc = product.imgSrc
        item.total = product.price * item.quantity
  
        console.log(req.session.userInfo)
  
        if(ind >= cart.length - 1){
            res.render('cart')
  
        }
  
      })
    })

  }

})

router.post('/cart/add/:id', isLoggedIn, (req,res)=>{

  req.session.userInfo.cart.push({
    id: req.params.id,
    quantity: req.body.quantity
  })

  userModel.updateOne({_id: req.session.userInfo._id }, {cart: req.session.userInfo.cart})
  .then(() =>{
    
    res.redirect('/user/cart')
  })
  .catch(err => console.log(err))

})

router.put('/cart/pay', isLoggedIn, (req,res)=>{

  req.session.userInfo.cart.forEach( (item, ind) => {

    productModel.findOne({_id : item.id})
    .then(product =>{
      productModel.updateOne({_id: product._id}, {quantity: product.quantity - item.quantity })
      .then(()=>{
        
        if(ind >= req.session.userInfo.cart.length - 1){
          
  
          userModel.updateOne({_id: req.session.userInfo._id}, {cart: []})
          .then(( )=>{
              req.session.userInfo.cart = []
              res.redirect('/')
          })
      }

      })
      .catch(err => console.log(err))


    })
    .catch(err => console.log(err))
  })

})

module.exports = router;
