'use strict'

const express=require ('express')
const cors=require('cors')
require('dotenv').config();
const axios=require('axios')
const server=express();
const mongoose = require('mongoose');
server.use (cors());
const PORT=process.env.PORT

mongoose.connect('mongodb://localhost:27017/bookLibrary', {useNewUrlParser: true, useUnifiedTopology: true});

const bookSchema= new mongoose.Schema({
    title:String,
    description:String, 
    email:String,
})

//Modal
const bookModal=mongoose.model('book',bookSchema)

function seedDataCollection(){
    const book1=new bookModal({
        title:'Atomic Habits',
        description:'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
        email:'Atomic_habits@hotmail.com'
    })

    const book2=new bookModal({
        title:'All In',
        description:'An inspiring and intimate self-portrait of the champion of equality that encompasses her brilliant tennis career, unwavering activism.',
        email:'All In@yahoo.com'
    })

    const book3=new bookModal({
        title:'Origin',
        description:'Robert Langdon, Harvard professor of symbology, arrives at the ultramodern Guggenheim Museum Bilbao to attend the unveiling of a discovery that “will change the face of science forever.”.',
        email:'Origin5Dan@hotmail.com'
    })

    const book4=new bookModal({
        title:'The Da Vinci Code',
        description:'The Da Vinci Code is a reading experience unlike any other. Simultaneously lightning-paced, intelligent, and intricately layered with remarkable research and detail.',
        email:'monaAleez@gmail.com'
    })
book1.save()
book2.save()
book3.save()
book4.save()
}

// seedDataCollection()npm 
///localhost:3001/
server.get('/',handlearServer)
server.get('/books',handlearBookServer)

function handlearServer(req,res){
    res.send('good start')
}
//localhost:3001/books?bookName=
function handlearBookServer(req,res){
 let bookEmail=req.query;
 bookModal.find({bookEmail:bookEmail},function(err,saveDat){
    if(err) {
        console.log('error in getting the data')
    } else {
        console.log(saveDat);
        res.send(saveDat);}

 })
    
}

server.listen(PORT,()=>{
    console.log(`This port ${PORT} work perfectly`);
})