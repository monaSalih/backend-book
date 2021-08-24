'use strict'

const express=require ('express');
const cors=require('cors');
const axios=require('axios');
require('dotenv').config();
const server=express();

server.use (cors());
const PORT=process.env.PORT
const bookModul=require('./Modules/bookTry')




//Modal


function seedDataCollection(){
    const book1=new bookModul({
        title:'Atomic Habits',
        description:'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
        email:'Atomic_habits@hotmail.com'
    })

    const book2=new bookModul({
        title:'All In',
        description:'An inspiring and intimate self-portrait of the champion of equality that encompasses her brilliant tennis career, unwavering activism.',
        email:'All In@yahoo.com'
    })

    const book3=new bookModul({
        title:'Origin',
        description:'Robert Langdon, Harvard professor of symbology, arrives at the ultramodern Guggenheim Museum Bilbao to attend the unveiling of a discovery that “will change the face of science forever.”.',
        email:'Origin5Dan@hotmail.com'
    })

    const book4=new bookModul({
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
//localhost:3001/books?email=
function handlearBookServer(req,res){
console.log('welcome im mongoose handler')
 let bookQuery=req.query.email;
 console.log('welcome im mongoose query',bookQuery)

 bookModul.find({email:bookQuery},function(err,saveDat){
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