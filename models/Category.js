const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
  const categorySchema = new Schema({
   
    name:
    {
      type:String,
      required:true
    },

    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const categoryModel = mongoose.model('Category', categorySchema);

 module.exports = categoryModel;