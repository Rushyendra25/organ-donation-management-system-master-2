const exp=require('express')
const app=exp()
const cors = require("cors");
app.use(cors());
require('dotenv').config()
const port=process.env.PORT||4000
app.listen(port,()=>{
    console.log("Server running on 4000")
})
const path=require("path")

//connecting to react build (frontend and backend)
app.use(exp.static(path.join(__dirname,'./build')))

const mclient=require("mongodb").MongoClient;
mclient
.connect("mongodb://127.0.0.1:27017")
.then((dbRef)=>
{   
    
      const dbObj=dbRef.db('usersdb')
      const userCollectionObj=dbObj.collection('collection1')
      const hospitalCollectionObj=dbObj.collection('collection2')
      console.log("db connection successful")
    
     app.set("userCollectionObj",userCollectionObj)
     app.set("hospitalCollectionObj",hospitalCollectionObj)
    
})
.catch((err)=>console.log("db connection error"));
const userApp=require('./usersApi')
app.use('/user-api',userApp)

const pageRefresh=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("/*",pageRefresh)

const invalidPathHandlingMiddleware=(req,res,next)=>{
    res.send({message:"Invalid path"})
}
app.use(invalidPathHandlingMiddleware)
const errorHandlingMiddleware=(error,req,res,next)=>{
   res.send({message:error.message})
}
app.use(errorHandlingMiddleware)
