import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CreateUser.css"

function CreateUser() {

  const navigate = useNavigate()

  const username = localStorage.getItem("username")

  const [patient,setPatient] = useState({
    patientName:"",
    age:"",
    bloodGroup:""
  })

  const [organ,setOrgan] = useState({
    organ:"",
    count:1,
    status:"available"
  })

  const [organsList,setOrgansList] = useState([])

  const organs = ["kidney","heart","liver","lungs","pancreas"]

  const bloodGroups = ["A+","A-","B+","B-","O+","O-","AB+","AB-"]

  // add organ entry
  const addOrgan = () => {

    if(!organ.organ){
      alert("Select organ")
      return
    }

    setOrgansList([...organsList,organ])

    setOrgan({
      organ:"",
      count:1,
      status:"available"
    })

  }

  // remove organ
  const removeOrgan = (index)=>{

    const updated=[...organsList]

    updated.splice(index,1)

    setOrgansList(updated)

  }

  // submit donation
  const submitForm = ()=>{

    if(!patient.patientName || !patient.age || !patient.bloodGroup){
      alert("Fill patient details")
      return
    }

    if(organsList.length===0){
      alert("Add at least one organ")
      return
    }

    const payload={
      username:username,
      patientName:patient.patientName,
      age:patient.age,
      bloodGroup:patient.bloodGroup,
      organs:organsList
    }

    axios.post("http://localhost:4000/user-api/donations",payload)

    .then(res=>{
      alert("Donation added successfully")
      navigate("/profile")
    })

    .catch(err=>console.log(err))

  }

  return(

    <div className="container mt-4">

      <h3 className="text-center mb-4">Organ Donation Form</h3>

      {/* Patient Details */}

      <div className="card p-3 mb-4">

        <h5>Patient Details</h5>

        <div className="row">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Patient Name"
              onChange={(e)=>setPatient({
                ...patient,
                patientName:e.target.value
              })}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              onChange={(e)=>setPatient({
                ...patient,
                age:e.target.value
              })}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              onChange={(e)=>setPatient({
                ...patient,
                bloodGroup:e.target.value
              })}
            >
              <option value="">Select Blood Group</option>

              {bloodGroups.map(bg=>(
                <option key={bg}>{bg}</option>
              ))}

            </select>
          </div>

        </div>

      </div>


      {/* Add Organ Section */}

      <div className="card p-3 mb-4">

        <h5>Add Organ</h5>

        <div className="row">

          <div className="col-md-4">

            <select
              className="form-control"
              value={organ.organ}
              onChange={(e)=>setOrgan({
                ...organ,
                organ:e.target.value
              })}
            >

              <option value="">Select Organ</option>

              {organs.map(o=>(
                <option key={o}>{o}</option>
              ))}

            </select>

          </div>

          <div className="col-md-3">

            <input
              type="number"
              className="form-control"
              min="1"
              value={organ.count}
              onChange={(e)=>setOrgan({
                ...organ,
                count:Number(e.target.value)
              })}
            />

          </div>

          <div className="col-md-3">

            <select
              className="form-control"
              value={organ.status}
              onChange={(e)=>setOrgan({
                ...organ,
                status:e.target.value
              })}
            >

              <option value="available">Available</option>
              <option value="transplanted">Transplanted</option>

            </select>

          </div>

          <div className="col-md-2">

            <button
              className="btn btn-success w-100"
              onClick={addOrgan}
            >
              Add
            </button>

          </div>

        </div>

      </div>


      {/* Organ List */}

      {organsList.length>0 &&

      <div className="card p-3 mb-4">

        <h5>Added Organs</h5>

        <table className="table table-bordered">

          <thead>

            <tr>
              <th>Organ</th>
              <th>Count</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {organsList.map((o,index)=>(
              <tr key={index}>

                <td>{o.organ}</td>
                <td>{o.count}</td>
                <td>{o.status}</td>

                <td>

                  <button
                    className="btn btn-danger"
                    onClick={()=>removeOrgan(index)}
                  >
                    Remove
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      }

      {/* Submit */}

      <button
        className="btn btn-danger w-100"
        onClick={submitForm}
      >
        Submit Donation
      </button>

    </div>

  )

}

export default CreateUser