const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
userApp.use(exp.json())
userApp.get("/donars",async(req,res,next)=>
{
    try{
     const hospitalCollectionObj=req.app.get("hospitalCollectionObj")
     let doc=await hospitalCollectionObj.find().toArray()
     res.status(200).send(doc)
    }
    catch(err)
    {
        next(err)
    }
})


//register
userApp.post("/register",expressAsyncHandler(async(req,res)=>
{
    let user=req.body;
    const userCollectionObj=req.app.get("userCollectionObj")
    const check=await userCollectionObj.findOne({username:user.username})
    if(check!=null)
    res.status(200).send("User already existed ")
    else{
        hashedPassword=await bcryptjs.hash(user.password,5);
        user.password=hashedPassword;
    
    await userCollectionObj.insertOne(user)
    res.status(201).send("User created")
    }
}))

//login
userApp.post("/login",expressAsyncHandler(async(req,res)=>{
    const userCollectionObj=req.app.get("userCollectionObj")
    let user=req.body
    let dbUser=await userCollectionObj.findOne({username:user.username})
    if(dbUser===null)
    res.status(200).send({message:"Invalid username"})
   else{
    let isEqual=await bcryptjs.compare(user.password,dbUser.password)
    if(isEqual==false)
     res.status(200).send({message:"Invalid password"})
    else{
        let token=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:60})
        delete dbUser.password
        res.status(201).send({message:"valid user",jwtToken:token,user:dbUser})
    }
   }

}))


//hospitals donor data storage
userApp.post("/hospitals",expressAsyncHandler(async(req,res)=>{
    const hospitalCollectionObj=req.app.get("hospitalCollectionObj")
    let data=req.body;
    await hospitalCollectionObj.insertOne(data)
    res.status(201).send("data stored")
    
}))



module.exports=userApp
