import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState:{errors} } = useForm();

  const [err,setErr] = useState("");

  const submitForm = (userObj)=>{

    axios.post("http://localhost:4000/user-api/register",userObj)
    .then(res=>{
        if(res.status===201){
            navigate("/login");
        }
        else{
            setErr(res.data);
        }
    })
    .catch(err=>{
        setErr("Registration failed");
    })

  }

  return (

    <div className="register">

      <div className="container">
        <h2 className="text-center">Hospital Registration</h2>

        {err && <p className="text-danger text-center">{err}</p>}

        <form onSubmit={handleSubmit(submitForm)}>

          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              {...register("username",{required:true})}
            />
          </div>

          <div className="mb-3">
            <label>Hospital Name</label>
            <input
              type="text"
              className="form-control"
              {...register("hospitalName",{required:true})}
            />
          </div>

          <div className="mb-3">
            <label>Hospital Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email",{required:true})}
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              {...register("phone",{required:true})}
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              {...register("address",{required:true})}
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password",{required:true})}
            />
          </div>

          <button className="btn btn-danger w-100">
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;




