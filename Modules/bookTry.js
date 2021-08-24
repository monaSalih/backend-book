const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookLibrary', {useNewUrlParser: true, useUnifiedTopology: true});

const bookSchema= new mongoose.Schema({
    title:String,
    description:String, 
    email:String,
})

const bookModal=mongoose.model('book',bookSchema)

module.exports=bookModal;