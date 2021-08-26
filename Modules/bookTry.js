const mongoose = require('mongoose');

mongoose.connect(process.env.MOGO_LINK, {useNewUrlParser: true, useUnifiedTopology: true});
//**'mongodb://localhost:27017/bookLibrary' */
const bookSchema= new mongoose.Schema({
    title:String,
    description:String, 
    email:String,
})

const bookModul=mongoose.model('book',bookSchema)

module.exports=bookModul;