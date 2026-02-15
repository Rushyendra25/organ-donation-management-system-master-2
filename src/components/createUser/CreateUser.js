import {useState} from 'react'
import {set, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CreateUser.css'
function CreateUser() {
   let navigate=useNavigate()
   const x=localStorage.getItem("token")
   const [reg,setReg]=useState(false)
    let {register,handleSubmit,formState:{errors}}=useForm();
   let submitForm=(userObj)=>{

            axios.post("http://localhost:4000/user-api/hospitals",userObj)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            navigate('/userList')
          
        }  ;

  return (
    
    
       
     <div className='formbg'>  
    
      {
        x!==null ?
        
      <div className="row ">
      <p className='text-danger'>*form can only filled once per login </p>
      <div className="col-11 col-sm-8 col-md-6   mx-auto  mt-5">
      <div className="container shadow rounded w-2 bg-white">
      
       <h1 className=" text-danger opacity-75  text-center">Donation Form</h1>
      <form onSubmit={handleSubmit(submitForm)} className="mt- mb-5  rounded p-5">
        <label htmlFor='HospitalName' className='text-black opacity-75'>Hospital Name:</label>
      <input type="text" className="form-control mb-3" id='HospitalName' 
        {...register("hname",{required:true})}/>

        {errors.hname?.type==="required" && <p className="text-danger ">*Hospital Name is required</p>}
        
        <label htmlFor='email' className='text-black opacity-75'>Hospital Email:</label>
        <input type="email" className="form-control mb-3" id='email' 
        {...register("email",{required:true})}/>
        {errors.email?.type==="required" && <p className="text-danger ">*Hospital Email is required</p>}

       <label htmlFor='phno' className='text-black opacity-75'>Phone Number:</label>
        <input type="number" className="form-control mb-3" id='phno' 
        {...register("phno",{required:true})}/>
        {errors.phno?.type==="required" && <p className="text-danger ">*Phone Number is required</p>}

        <label htmlFor='address'  className='text-black opacity-75'>Address:</label>
        <textarea id="address" rows={"4"} cols={"93"} className="form-control mb-3" {...register("address",{required:true})}>
        </textarea>
        {errors.address?.type==="required" && <p className="text-danger ">*Hospital Address is required</p>}

      
        <label className='text-black opacity-75' >Organs</label>
        <br />
        <label htmlFor='kidney' className="mt-2 text-black opacity-75">Kidney:</label>
        <input type="number" className="form-control mb-3" id='kidney' placeholder='Enter no of kidneys available'
         {...register("kidney",{required:true})} />
          {errors.kidney?.type==="required" && <p className="text-danger ">Enter 0 if not available</p>}


        <label htmlFor='heart' className='text-black opacity-75'>Heart:</label>
        <input type="number" className="form-control mb-3" id='heart' placeholder='Enter no of hearts available'
        {...register("heart",{required:true})}/>
        {errors.heart?.type==="required" && <p className="text-danger ">Enter 0 if not available</p>}

        <label htmlFor='liver' className='text-black opacity-75'>Liver:</label>
        <input type="number" className="form-control mb-3" id='liver' placeholder='Enter no of livers available'
        {...register("liver",{required:true})}/>
        {errors.liver?.type==="required" && <p className="text-danger ">Enter 0 if not available</p>}

        <label htmlFor='lungs' className='text-black opacity-75'>Lungs:</label>
        <input type="number" className="form-control mb-3" id='lungs' placeholder='Enter no of lungs available'
        {...register("lungs",{required:true})}/>
        {errors.lungs?.type==="required" && <p className="text-danger ">Enter 0 if not available</p>}

        <label htmlFor='pancreas' className='text-black opacity-75'>Pancreas:</label>
        <input type="number" className="form-control mb-3" id='pancreas' placeholder='Enter no of pancreas available'
        {...register("pancreas",{required:true})}/>
        {errors.pancreas?.type==="required" && <p className="text-danger ">Enter 0 if not available</p>}
        
        <label htmlFor='bldgrp' className='text-black opacity-75'>Blood Group:</label>
        <select {...register("bloodgrp",{required:true})} className="form-select " defaultValue={"A+"} id='bldgrp'>

               <option value="DEFAULT" disabled>Choose Blood Group</option>
               <option value="A+">A+</option>
               <option value="A-">A-</option>
               <option value="B+">B+</option>
               <option value="B-">B-</option>
               <option value="O+">O+</option>
               <option value="O-">O-</option>
               <option value="AB+">AB+</option>
               <option value="AB-">AB-</option>
        </select>
        {errors.bloodgrp?.type==="required" && <p className="text-danger ">*Blood group is required</p>}
        <button type="submit" className="btn btn-danger mt-3">Donate</button>
        </form>
        </div>
      </div>  
      </div>
      :
      <p className='text-danger'>Unauthorized access!! Please Login </p>
    }

      </div>



  )
}

export default CreateUser;