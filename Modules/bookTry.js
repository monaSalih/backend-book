const mongoose = require('mongoose');

mongoose.connect(process.env.MOGO_LINK, {useNewUrlParser: true, useUnifiedTopology: true});

const bookSchema= new mongoose.Schema({
    title:String,
    description:String, 
    email:String,
})

const bookModal=mongoose.model('book',bookSchema)

module.exports=bookModal;