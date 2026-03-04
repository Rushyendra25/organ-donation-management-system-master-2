import React from 'react'
import { useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import {useForm} from 'react-hook-form'
function UserList() {
 let [data,setdata]=useState([])
 let [search,setsearch]=useState('')
 const x=localStorage.getItem("token")
 const isloggedIn=useSelector(state=>state.auth.isloggedIn)
 let {register,handleSubmit,formState:{errors}}=useForm();
    let submitForm=(userObj)=>{
            setsearch(userObj.organ)
         } 
  useEffect(()=>{
   axios.get(" http://localhost:4000/user-api/donars")
   .then((res)=>
    {
     
      setdata(res.data)
    })
   .catch(err=>console.log(err))
  },[]) 
  console.log(x);
  
  return (
    <div>
   {
    isloggedIn!==false?
    <div className='container'> 

     
     
      <form onSubmit={handleSubmit(submitForm)}>
      <select {...register("organ")} className="form-select mt-3" defaultValue={"DEFAULT"}>

                <option value="DEFAULT" disabled>Choose organ</option>
                <option value="kidney">kidney</option>
                <option value="heart">heart</option>
                <option value="liver">liver</option>
                <option value="lungs" >lungs</option>
                <option value="pancreas" >pancreas</option>

         </select>
         <button type="submit" className="btn btn-danger opacity-75 mt-3 mb-5">Search</button>
      </form>

    {
      search==='' &&
    <table className="table table-striped text-center">
      <thead className='bg-danger opacity-75'>
        <tr  className='text-light'> 
        <th>Hospital Name</th>
        <th>Hospital Email</th>
        <th>Phone Number</th>
        <th>Blood Group</th>
        </tr>     
      </thead>
      <tbody>
        {
           data.map((obj)=>
            <tr key={obj._id}>
              <td>{obj.hname}</td>
              <td>{obj.email}</td>
              <td>{obj.phno}</td>
              <td>{obj.bloodgrp}</td>
            </tr>
          )
        }
      </tbody>

      
     </table>
}
{
  search==='kidney'&&
  <table className="table table-striped text-center">
  <thead className='bg-danger opacity-75'>
        <tr  className='text-light'>
        <th>Hospital Name</th>
        <th>Hospital Email</th>
        <th>Phone Number</th>
<th>Blood Group</th>
<th>Organ</th>
        </tr>
        
      </thead>
  <tbody>
    {
       
     data.filter((a)=>a.kidney!=="0").map(a=> <tr key={a._id}>
        
        <td>{a.hname}</td>
        <td>{a.email}</td>
        <td>{a.phno}</td>
        <td>{a.bloodgrp}</td>
        <td>kidney</td></tr>)      
    }
  </tbody>

  
 </table>
}

{
  search==='heart'&&
  <table className="table table-striped text-center">
 <thead className='bg-danger opacity-75'>
        <tr  className='text-light'>
        <th>Hospital Name</th>
        <th>Hospital Email</th>
        <th>Phone Number</th>
<th>Blood Group</th>
<th>Organ</th>
        </tr>
        
      </thead>
  <tbody>
    {
       
     data.filter((a)=>a.heart!=="0").map(a=> <tr key={a._id}>
        
        <td>{a.hname}</td>
        <td>{a.email}</td>
        <td>{a.phno}</td>
        <td>{a.bloodgrp}</td>
        <td>heart</td></tr>)  

        
      
    }
  </tbody>

  
 </table>
}

{
  search==='lungs'&&
  <table className="table table-striped text-center">
  <thead className='bg-danger opacity-75'>
        <tr  className='text-light'>
        <th>Hospital Name</th>
        <th>Hospital Email</th>
        <th>Phone Number</th>
<th>Blood Group</th>
<th>Organ</th>
        </tr>
        
      </thead>
  <tbody>
    {
       
     data.filter((a)=>a.lungs!=="0").map(a=> <tr key={a._id}>
        
        <td>{a.hname}</td>
        <td>{a.email}</td>
        <td>{a.phno}</td>
        <td>{a.bloodgrp}</td>
        <td>lungs</td></tr>)  

        
      
    }
  </tbody>

  
 </table>
}


{
  search==='liver'&&
  <table className="table table-striped text-center">
  <thead className='bg-danger opacity-75'>
        <tr  className='text-light'>
        <th>Hospital Name</th>
        <th>Hospital Email</th>
        <th>Phone Number</th>
<th>Blood Group</th>
<th>Organ</th>
        </tr>
        
      </thead>
  <tbody>
    {
       
     data.filter((a)=>a.liver!=="0").map(a=> <tr key={a._id}>
        
        <td>{a.hname}</td>
        <td>{a.email}</td>
        <td>{a.phno}</td>
        <td>{a.bloodgrp}</td>
        <td>liver</td></tr>)  

        
      
    }
  </tbody>

  
 </table>
}

{
  search==='pancreas'&&
  <table className="table table-striped text-center">
  <thead className='bg-danger opacity-75'>
        <tr  className='text-light'>
        <th>Hospital Name</th>
        <th>Hospital Email</th>
        <th>Phone Number</th>
<th>Blood Group</th>
<th>Organ</th>
        </tr>
        
      </thead>
  <tbody>
    {
       
     data.filter((a)=>a.pancreas!=="0").map(a=> <tr key={a._id}>
        
        <td>{a.hname}</td>
        <td>{a.email}</td>
        <td>{a.phno}</td>
        <td>{a.bloodgrp}</td>
        <td>pancreas</td></tr>)  

        
      
    }
  </tbody>

  
 </table>
}
     

    </div>
    :
    <center>
    <p className='text-danger invalid'>Unauthorized access!! Please Login </p>
    </center>
    
}
    </div>
  )
}

export default UserList;