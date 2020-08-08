const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session')

require('dotenv').config({path:"./config/keys.env"});

const { capitalizeFirst, formatCurrency } = require('./jr-node-utils');

//set PORT here
const PORT =  process.env.PORT;


// Init express
const app = express();

// Set up static routes
app.use(express.static('public'))

//CREATE HANDLEBARS AND CUSTOM HELPERS
const hbs = exphbs.create({

  helpers:{
    capitalizeFirst: (word)  => capitalizeFirst(word),
    toCurrency     : (value) => formatCurrency(value),
    ifeq           : (v1, v2, options)=> v1 == v2 ? options.fn(this) : options.inverse(this)
  }
})

//Set template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Custom middlewares for PUT and DELETE from forms
app.use((req,res,next)=>{

  if(req.query.method=="PUT")
  {
      req.method="PUT"
  }

  else if(req.query.method=="DELETE")
  {
      req.method="DELETE"
  }

  next();
})

// app.use(fileUpload());

// Setting up session
app.use(session({
  secret: `${process.env.SECRET_SESSION}`,
  resave: false,
  saveUninitialized: true
}))

app.use((req,res,next)=>{


  res.locals.user= req.session.userInfo;

  next();
})


// Connect to Mongo Atlas Cluster

mongoose.connect(process.env.MONGODB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DataBase connected.'))
.catch( err => console.log('Error connecting to DataBase: ' + err))



// load controllers
const generalController = require('./controllers/general')
const productsController = require('./controllers/products')
const userController = require('./controllers/user')

// maping controllers
app.use('/',generalController)
app.use('/products/',productsController)
app.use('/user',userController)


// app.engine.registerHelper("noop", function(options) {
//   return options.fn(this);
// });


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


