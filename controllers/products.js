const express = require('express');
const path = require('path')
const router = express.Router();
const fakeDB  = require('../models/Product').fakeDB;
const productModel = require('../models/Product');
const categoryModel = require('../models/Category');
const {adminOnly} = require('../middleware/authorization')
const fs = require('fs');


const user = require('../models/user');
const session = require('express-session');


// Products Page
router.get('/', (req,res) =>{

    productModel.find()
    .then( products => {

      categoryModel.find()
      .then( categories => {

        const expressions = {
          title: 'Products',
          products: products.map( product => product.toObject()),
          categories: categories.map( category => category.toObject()),
          
          // userLogged    : user.logged,
          // userName      : user.name,
    
          // user: req.session.userInfo,
    
          loginEmail: req.query.loginEmail || " ",
          loginPassword: req.query.loginPassword || " ",
          loginTry: req.query.loginTry || false,
          loginModal: req.query.loginModal || false,
    
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
      
        res.render('products',expressions)

      })




    })

  
  });
  
  router.get('/list/:category', (req,res) =>{


    productModel.find({category: req.params.category})
    .then( products => {

      categoryModel.find()
      .then( categories => {


        const expressions = {
          title: 'Products',
          products: products.map( product => product.toObject()),
          categories: categories.map( category => category.toObject()),
    
        
          
    
          loginEmail: req.query.loginEmail || " ",
          loginPassword: req.query.loginPassword || " ",
          loginTry: req.query.loginTry || false,
          loginModal: req.query.loginModal || false,
    
          // user: req.session.userInfo,
    
    
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
      
      
        res.render('products',expressions)


      })

    })

  
 
  
  });

  router.get('/migrate', (req, res) =>{

    fakeDB.getCategories().forEach( category =>{

      new categoryModel({name: category}).save()
      .catch(err => console.log(err))
    })

  

    // productModel.find()
    // .then(productsList => {

    //   console.log(productsList)
    //   productsList.forEach( product =>{
    //     console.log(product._id)
    //     productModel.updateOne({ _id: product._id},  { quantity : 20 })
    //     .catch(err => console.log('error updating qnt : ' + err))
    //   })

    // })

  })

  router.post("/add", adminOnly, (req, res) => {
    // ///////////////////
  
    const { product_id, product_name,  product_category, product_price, product_description, product_isFeatured, product_isBestSelling, product_quantity } = req.body;
  
    newProduct = {
      name: product_name,
      category: product_category,
      price: product_price,
      description: product_description,
      isBestSelling: product_isBestSelling === 'on' ? true : false,
      quantity: product_quantity,
      isFeatured: product_isFeatured === 'on' ? true : false,
    }

    const product = new productModel(newProduct)

    product.save()
    .then( product => {

      // If category doesn't exist, add anew one
      categoryModel.findOne({name: product.category})
      .then( category => {
        console.log('category : ' + category)
        if (category == null){
          console.log('adding new category: ' + product.category)
          new categoryModel({name: product.category})
          .save()
          .catch(err => console.log('Error saving new category : ' + err))
        }
      })

      // Handles the file upload
      req.files.product_imgFile.name = `${product._id}${path.parse(req.files.product_imgFile.name).ext}`;
      req.files.product_imgFile.mv(`public/uploads/products/${req.files.product_imgFile.name}`)
      .then(() => {
        
        productModel.updateOne({_id: product._id }, {
          imgSrc : req.files.product_imgFile.name
        })
        .then(()=>{
          res.redirect('/user/auth')
        })

      })

    })
    .catch(err=>console.log(`Error while inserting product into the database ${err}`));

    console.log(req.body);

    // const product = new productModel
  
    // if (email == "" || password == "") {
    //   console.log("WRONG");
  
    //   res.redirect(
    //     url.format({
    //       pathname: currentRoute,
    //       query: {
    //         loginEmail: String(email),
    //         loginPassword: String(password),
    //         loginModal: true,
    //         loginTry: true,
    //       },
    //     })
    //   );
    // } else {
    //   /////////////////////////////////////
  
    //   userModel
    //     .findOne({ email: req.body.email })
    //     .then((user) => {
    //       const error = "";
  
    //       //email not found
    //       if (user == null) {
    //         const error = "Email and/or Password incorrect";
  
    //         console.log(req.body);
    //         console.log(req.url);
  
    //         console.log("WRONG email/pwd");
    //         res.redirect(
    //           url.format({
    //             pathname: currentRoute,
    //             query: {
    //               error,
    //               loginEmail: String(email),
    //               loginPassword: String(password),
    //               loginModal: true,
    //               loginTry: true,
    //             },
    //           })
    //         );
    //       }
    //       //email is found
    //       else {
    //         console.log("BCRYPT");
  
    //         bcrypt
    //           .compare(req.body.password, user.password)
    //           .then((isMatched) => {
    //             if (isMatched) {
    //               req.session.userInfo = user;
  
    //               res.redirect("/user/auth");
    //             } else {
    //               const error = "Email and/or Password incorrect";
  
    //               console.log(req.body);
    //               console.log(req.url);
  
    //               console.log("WRONG");
  
    //               res.redirect(
    //                 url.format({
    //                   pathname: currentRoute,
    //                   query: {
    //                     error,
    //                     loginEmail: String(email),
    //                     loginPassword: String(password),
    //                     loginModal: true,
    //                     loginTry: true,
    //                   },
    //                 })
    //               );
    //             }
    //           })
    //           .catch((err) => console.log(`Error ${err}`));
    //       }
    //     })
    //     .catch((err) => console.log(`Error ${err}`));
  
    //   /////////////////////////////////////
  
    // }
  });


  router.put("/edit", adminOnly, (req, res) => {
    // ///////////////////
  // Arrumar aqui, primeiro ver a questao da imagem, depois fazer update

    const { product_id, product_name,  product_category, product_price, product_description, product_isFeatured, product_isBestSelling, product_quantity } = req.body;
  
    const editedProduct = {
      name: product_name,
      category: product_category,
      price: product_price,
      description: product_description,
      isBestSelling: product_isBestSelling === 'on' ? true : false,
      isFeatured: product_isFeatured === 'on' ? true : false,
      quantity: product_quantity
    }


    function updateProduct(){
      productModel.updateOne({_id: product_id }, editedProduct)
      .then( product => {
 
        // If category doesn't exist, add anew one
        categoryModel.findOne({name: product.category})
        .then( category => {
          console.log('category : ' + category)
          if (category == null){
            console.log('adding new category: ' + product.category)
            new categoryModel({name: product.category})
            .save()
            .catch(err => console.log('Error saving new category : ' + err))
          }
        })
        .then(()=>{
          res.redirect('/user/auth')
        })
 
      })    
     .catch(err=>console.log(`Error while updating product on the database ${err}`));
 
     console.log(req.body);
    }

     // Handles the file upload
     if(req.files !== null){
      console.log('UPDATING IMAGE')
      productModel.findOne({_id: product_id}).then(product=>{
     
        fs.unlink(`public/uploads/products/${product.imgSrc}`,()=>{

          req.files.product_imgFile.name = `${product._id}${path.parse(req.files.product_imgFile.name).ext}`;
          req.files.product_imgFile.mv(`public/uploads/products/${req.files.product_imgFile.name}`)
          .then(() => {

            editedProduct.imgSrc = req.files.product_imgFile.name
            updateProduct()
     
          })

        })
         

        }
      )
     }else{
      updateProduct()
     }



   
  });

router.get('/dashboard', adminOnly, (req, res)=>{

  productModel.find({}).then( productsList => {
    
    categoryModel.find({}).then ( categoriesList =>{


      const expressions = {
        productsList : productsList.map( product => product.toObject()),
        categoriesList : categoriesList.map( category => category.toObject())
      }
    
      // console.log(expressions.productsList)
      res.render('clerkDashboard', expressions)

    })


  })
})

router.delete("/delete/:id",(req,res)=>{
    
  productModel.deleteOne({_id:req.params.id})
  .then(()=>{
      res.redirect("/user/auth");
  })
  .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));

});

  module.exports = router;