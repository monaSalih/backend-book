'use strict'

const express=require ('express');
const cors=require('cors');
const axios=require('axios');
require('dotenv').config();
const server=express();
server.use(express.json())
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
//////////**handlear function */
seedDataCollection() 
///localhost:3001/
server.get('/',handlearServer)
server.get('/books',handlearBookServer)
// server.post('/books',addHAndlear)
server.post('/bookObj',bookObjHandelar)
server.delete('/deletObj/:idBook',deletObjHandelar)
server.put('/updateBook/:idBook',updateHandelar)
///////////////////function
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
//////////add function
async function bookObjHandelar(req,res){
    console.log("test body","body test");
    console.log('add function');
    let title=req.body.params.title
       let description= req.body.params.description
       let email= req.body.params.email
    // let email=req.body.email
    console.log(title,description,email);
    //   let {title,description,email}=req.body
console.log(req.body.params.email);
await bookModul.create({title,description,email})

bookModul.find({email},function(err,saveDat){
    if(err) {
        console.log('error in getting the data')
    } else {
        console.log(saveDat);
        res.send(saveDat);}
 })

  
}
////////////

///////////////////remove function 

async function deletObjHandelar(req,res){ 
    console.log('delete handelare');
    ///***localhost:3001/deletObj/catId)

    let userEmail=req.query.emailUser
    console.log(userEmail);
    let idBook=req.params.idBook
    console.log(req.params,'req.params result');
// console.log(req.query);
bookModul.remove({_id:idBook},function(err,saveDat1){
        if(err) {
            console.log('error in getting the data')
        } else {
            // console.log(saveDat);
            bookModul.find({email:userEmail},function(err,saveDat){
                if(err) {
                    console.log('error in getting the data')
                } else {
                    console.log(saveDat);
                     return res.send(saveDat);}
                    
            
             })
            
            // res.send(saveDat);
        }
    
     })
}
///////////////////
function updateHandelar(req,res){
    let {title,description,email}=req.body
    let idBook=req.params.idBook

    bookModul.findOne({_id:idBook},function(err,bookInfo){
        bookInfo.title=title,
        bookInfo.description=description,
        bookInfo.email=email
        bookInfo.save()
        ////**we have to put [0]becuse we save info in array in case we use find */
        .then(()=>{ bookModul.find({email},function(err,saveDat){
                            if(err) {
                                console.log('error in getting the data')
                            } else {
                                console.log(saveDat);
                                res.send(saveDat);}
                        
                         })

        })
    })
}

server.listen(PORT,()=>{
    console.log(`This port ${PORT} work perfectly`);
})