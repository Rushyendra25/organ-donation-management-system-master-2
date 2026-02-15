import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate,Link} from 'react-router-dom'
import './Register.css'
import axios from 'axios';
function Register(props) {
  const navigate=useNavigate();
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [err,SetErr]=useState("")
   let submitForm=(userObj)=>{
            console.log(userObj);
           axios.post("http://localhost:4000/user-api/register",userObj)
           .then((res)=>{
            if(res.status===201){
            navigate('/login');
            }
           else
             SetErr(res.data)
           })
           .catch(error=>{
            SetErr(error)
           })
           

        }  

  return (
    <div className='register' >
    <div className="row ">
    {/* <div className="col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2">
    <div className="container  rounded w-2 bg-white">
      <div className="row"> */}
     
       <div className=" ">
 

    <form onSubmit={handleSubmit(submitForm)} className="mt-5 fo ms-auto shadow">
    <h1 className="mb-3 text-danger opacity-75 fw-bold fs-1 display-5 mb-5 ">REGISTER</h1>
     { (err.length!=0 )?  <p className='text-danger'>{err}</p> : <p></p>}
    <input type="text" className="form-control mb-3 p-3 inp" placeholder="Hospital Username" 
      {...register("username",{required:true,minLength:"4"})}/>

      {errors.username?.type==="required" && <p className="text-danger ">*Username is required</p>}
      {errors.username?.type==="minLength" && <p className="text-danger ">*minimum 4 characters are required</p>}
      {errors.username?.type==="maxLength" && <p className="text-danger ">*maximum 8 characters are required</p>}

      <input type="password" className="form-control mb-3 p-3 inp" placeholder="Password" 
      {...register("password",{required:true,minLength:"4"})}/>
      {errors.password?.type==="required" && <p className="text-danger ">*Password is required</p>}
      {errors.password?.type==="minLength" && <p className="text-danger ">*minimum 4 characters are required</p>}
      {errors.password?.type==="maxLength" && <p className="text-danger ">*maximum 8 characters are required</p>}
      
      <div className=''>
      <button type="submit" className="btn btn-danger mt-3 mb-5 ">Register</button>
      </div>
      </form>

       </div>
      </div>
    </div>  
   
  )
}

export default Register;