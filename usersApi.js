const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
userApp.use(exp.json())

//get 
userApp.get("/donors",async(req,res,next)=>
{
    const organCollection = req.app.get("organCollection")
    const userCollectionObj = req.app.get("userCollectionObj")

    const patients = await organCollection.find().toArray()

    let result = []

    for (let patient of patients) {

        const hospital = await userCollectionObj.findOne({
            username: patient.username
        })

        if (!hospital) continue

        for (let organ of patient.organs) {

            if (organ.status === "available") {

                result.push({

                    hospitalName: hospital.hospitalName,
                    email: hospital.email,
                    phone: hospital.phone,
                    patientName: patient.patientName,
                    age: patient.age,
                    bloodGroup: patient.bloodGroup,
                    organ: organ.organ,
                    count: organ.count

                })

            }

        }

    }

    res.send(result)

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
        let token=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:600})
        delete dbUser.password
        res.status(201).send({message:"valid user",jwtToken:token,user:dbUser,hospitalName:dbUser.hospitalName,
        email:dbUser.email,
        phone:dbUser.phone})
    }
   }

}))




//hospitals donor data storage
userApp.post("/hospitals",expressAsyncHandler(async(req,res)=>{
    const organCollection=req.app.get("organCollection")
    let data=req.body;
    
    for (let item of data) {

        const fieldPath = `organs.${item.organ}.${item.bloodGroup}`

        await organCollection.updateOne(

            { username: item.username },

            {
                $inc: { [fieldPath]: item.count }
            },

            { upsert: true }

        )

    }
    res.status(200).send({ message: "Hospital organ inventory updated" })
    
}))


/* ============================
   ADD PATIENT DONATION
   ============================ */

   const { ObjectId } = require("mongodb")

   userApp.post("/donations", expressAsyncHandler(async (req,res)=>{
   
       const organCollection = req.app.get("organCollection")
   
       const {username, patientName, age, bloodGroup, organs} = req.body
   
       // check if patient already exists
       const existingPatient = await organCollection.findOne({
           username,
           patientName,
           age,
           bloodGroup
       })
   
       if(existingPatient){
   
           // add organs to existing patient
           await organCollection.updateOne(
               { _id: existingPatient._id },
               {
                   $push: { organs: { $each: organs } }
               }
           )
   
           res.send({message:"Organs added to existing patient"})
   
       }
       else{
   
           // create new patient
           await organCollection.insertOne({
               username,
               patientName,
               age,
               bloodGroup,
               organs,
               createdAt:new Date()
           })
   
           res.send({message:"New patient donation added"})
       }
   
   }))


/* ============================
   GET HOSPITAL PROFILE DATA
   ============================ */

   userApp.get("/hospital/:username", expressAsyncHandler(async (req,res)=>{
   
       const organCollection = req.app.get("organCollection")
   
       const username = req.params.username
   
       const patients = await organCollection.find({
           username: username
       }).toArray()
   
       res.send(patients)
   
   }))



/* ============================
   UPDATE ORGAN ENTRY
   ============================ */
   userApp.put("/donation/:id", expressAsyncHandler(async (req,res)=>{

    const organCollection = req.app.get("organCollection")

    const {organIndex,count,status} = req.body

    await organCollection.updateOne(

        {_id:new ObjectId(req.params.id)},

        {
            $set:{
                [`organs.${organIndex}.count`]:Number(count),
                [`organs.${organIndex}.status`]:status
            }
        }

    )

    res.send({message:"Organ updated"})
}))


/* ============================
   ADD NEW ORGAN TO PATIENT
   ============================ */

   userApp.put("/add-organ/:id", expressAsyncHandler(async(req,res)=>{

    const organCollection=req.app.get("organCollection")

    const {organ,count,status} = req.body

    await organCollection.updateOne(

        {_id:new ObjectId(req.params.id)},

        {
            $push:{
                organs:{
                    organ,
                    count:Number(count),
                    status
                }
            }
        }

    )

    res.send({message:"Organ added"})

}))



/* ============================
   REMOVE ORGAN FROM PATIENT
   ============================ */

   userApp.put("/remove-organ/:id", expressAsyncHandler(async(req,res)=>{

    const organCollection=req.app.get("organCollection")

    const {organIndex}=req.body

    const patient = await organCollection.findOne({
        _id:new ObjectId(req.params.id)
    })

    let organs = patient.organs || []

    organs.splice(organIndex,1)

    await organCollection.updateOne(

        {_id:new ObjectId(req.params.id)},

        {
            $set:{organs:organs}
        }

    )

    res.send({message:"Organ removed"})

}))



//patient Deletion

userApp.delete("/patient/:id", expressAsyncHandler(async(req,res)=>{

  const organCollection = req.app.get("organCollection")

  const patient = await organCollection.findOne({
    _id:new ObjectId(req.params.id)
  })

  const canDelete = patient.organs.length === 0 ||
    patient.organs.every(o=>o.status==="transplanted")

  if(!canDelete){
    return res.status(400).send({message:"Patient cannot be deleted"})
  }

  await organCollection.deleteOne({
    _id:new ObjectId(req.params.id)
  })

  res.send({message:"Patient deleted"})

}))



//charts APi

userApp.get("/dashboard/:username", async (req,res)=>{

    const organCollection = req.app.get("organCollection")
  
    const username = req.params.username
  
    const patients = await organCollection.find({username}).toArray()
  
    const organCounts = {}
  
    patients.forEach(patient => {
  
      (patient.organs || []).forEach(o => {
  
        if(o.status === "available"){
  
          if(!organCounts[o.organ]){
            organCounts[o.organ] = 0
          }
  
          organCounts[o.organ] += Number(o.count)
  
        }
  
      })
  
    })
  
    const result = Object.keys(organCounts).map(k=>({
      organ:k,
      count:organCounts[k]
    }))
  
    res.send(result)
  
  })

module.exports=userApp
