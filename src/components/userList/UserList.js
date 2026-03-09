import React,{useState,useEffect} from "react";
import axios from "axios";

function UserList(){

  const [data,setData] = useState([]);
  const [filtered,setFiltered] = useState([]);

  const [organ,setOrgan] = useState("");
  const [blood,setBlood] = useState("");

  useEffect(()=>{

    axios.get("http://localhost:4000/user-api/donors")
    .then(res=>{
      setData(res.data);
      setFiltered(res.data);
    })
    .catch(err=>console.log(err))

  },[])

  const searchData=()=>{

    let result = data.filter(item=>{

      return (
        (organ==="" || item.organ===organ) &&
        (blood==="" || item.bloodGroup===blood)
      )

    })

    setFiltered(result)

  }

  return(

    <div className="container mt-4">

      <div className="row mb-4">

        <div className="col-md-4">

          <select
          className="form-select"
          onChange={(e)=>setOrgan(e.target.value)}
          >

            <option value="">All Organs</option>
            <option value="kidney">Kidney</option>
            <option value="heart">Heart</option>
            <option value="liver">Liver</option>
            <option value="lungs">Lungs</option>
            <option value="pancreas">Pancreas</option>

          </select>

        </div>

        <div className="col-md-4">

          <select
          className="form-select"
          onChange={(e)=>setBlood(e.target.value)}
          >

            <option value="">All Blood Groups</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>

          </select>

        </div>

        <div className="col-md-4">

          <button
          className="btn btn-danger w-100"
          onClick={searchData}
          >
            Search
          </button>

        </div>

      </div>

      <table className="table table-striped">

        <thead className="table-danger">

          <tr>
            <th>Hospital</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Organ</th>
            <th>Blood Group</th>
            <th>Available Count</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((item,index)=>(

            <tr key={index}>

              <td>{item.hospitalName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.organ}</td>
              <td>{item.bloodGroup}</td>
              <td>{item.count}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default UserList;