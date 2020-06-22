const express = require('express');
const exphbs  = require('express-handlebars');
const fakeDB  = require('./model/Products');
const { capitalizeFirst, formatCurrency } = require('./jr-node-utils');

//set PORT here
const PORT =  process.env.PORT || 3000;


console.log(fakeDB.getCategories())

// Init express
const app = express();

// Set up static routes
app.use(express.static('public'))

//CREATE HANDLEBARS AND CUSTOM HELPERS
const hbs = exphbs.create({

  helpers:{
    capitalizeFirst: (word)  => capitalizeFirst(word),
    toCurrency     : (value) => formatCurrency(value)
  }
})

//Set template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// app.engine.registerHelper("noop", function(options) {
//   return options.fn(this);
// });



//HOME route
app.get('/', (req,res) =>{

  const expressions = {
    title: 'Home',
    categories: fakeDB.getCategories(),
    bestSellers: fakeDB.getBestSellingProducts()
  }

  res.render('home', expressions)

});

// Products Page
app.get('/products', (req,res) =>{

  const expressions = {
    title: 'Products',
    products : fakeDB.getAllProducts().reverse(),
    categories: fakeDB.getCategories()
  }

  res.render('products',expressions)

});

app.get('/products/:category', (req,res) =>{

  const expressions = {
    title: 'Products',
    products : fakeDB.getProductsFromCategory(req.params.category),
    categories: fakeDB.getCategories()
  }


  res.render('products',expressions)

});

// Pop-ups


// Customer Registration
// app.get('/registration', (req,res) =>{

//   const expressions = {
//     title: 'User Registration'
//   }
//   res.render('registration',expressions)

// });

// // Login
// app.get('/login', (req,res) =>{
  
//   const expressions = {
//     title: 'User Login'
//   }
//   res.render('login',expressions)

// });




app.listen(PORT, ()=>{
  console.log(`Server running on PORT: ${PORT}`)
})


