import { useEffect, useState } from "react"
import axios from "axios"

function Profile(){

  const username = localStorage.getItem("username")

  const [patients,setPatients] = useState([])

  const organsList = ["kidney","heart","liver","lungs","pancreas"]

  const [newOrgan,setNewOrgan] = useState({})
  const [newCount,setNewCount] = useState({})


  const fetchData = ()=>{

    axios.get(`http://localhost:4000/user-api/hospital/${username}`)
    .then(res=>{
      setPatients(res.data)
    })
    .catch(err=>console.log(err))

  }

  useEffect(()=>{
    fetchData()
  },[])



  /* ---------------- UPDATE ORGAN ---------------- */

  const updateOrgan = (patientId,index,organ)=>{

    axios.put(`http://localhost:4000/user-api/donation/${patientId}`,{
      organIndex:index,
      count:organ.count,
      status:organ.status
    })
    .then(()=>fetchData())

  }



  /* ---------------- REMOVE ORGAN ---------------- */

  const removeOrgan = (patientId,index)=>{

    axios.put(`http://localhost:4000/user-api/remove-organ/${patientId}`,{
      organIndex:index
    })
    .then(()=>fetchData())

  }



  /* ---------------- ADD ORGAN ---------------- */

  const addOrgan = (patientId)=>{

    const organ = newOrgan[patientId]
    const count = newCount[patientId]

    if(!organ || !count){
      alert("Select organ and count")
      return
    }

    axios.put(`http://localhost:4000/user-api/add-organ/${patientId}`,{
      organ,
      count:Number(count),
      status:"available"
    })
    .then(()=>{
      fetchData()
      setNewOrgan({...newOrgan,[patientId]:""})
      setNewCount({...newCount,[patientId]:""})
    })

  }



  /* ---------------- DELETE PATIENT ---------------- */

  const deletePatient = (patient)=>{

    const canDelete = patient.organs.length === 0 ||
      patient.organs.every(o=>o.status==="transplanted")

    if(!canDelete){
      alert("Patient cannot be deleted until all organs are transplanted")
      return
    }

    axios.delete(`http://localhost:4000/user-api/patient/${patient._id}`)
    .then(()=>{
      fetchData()
    })

  }



  return(

    <div className="container mt-4">

      <h3 className="text-center mb-4">Hospital Profile</h3>

      {patients.map(patient=>(

        <div key={patient._id} className="card mb-4 p-3">

          <div className="d-flex justify-content-between">

            <h5>
              Patient: {patient.patientName} | Age: {patient.age} | Blood: {patient.bloodGroup}
            </h5>

            <button
              className="btn btn-danger btn-sm"
              onClick={()=>deletePatient(patient)}
            >
              Delete Patient
            </button>

          </div>


          <table className="table table-bordered mt-3">

            <thead className="table-danger">

              <tr>
                <th>Organ</th>
                <th>Count</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {patient.organs
                .filter(o=>o!==null)
                .map((organ,index)=>(

                <tr key={index}>

                  <td>{organ.organ}</td>

                  <td>

                    <input
                      type="number"
                      className="form-control"
                      value={organ.count}
                      onChange={(e)=>{

                        const updated=[...patients]

                        updated
                          .find(p=>p._id===patient._id)
                          .organs[index]
                          .count = Number(e.target.value)

                        setPatients(updated)

                      }}
                    />

                  </td>

                  <td>

                    <select
                      className="form-control"
                      value={organ.status}
                      onChange={(e)=>{

                        const updated=[...patients]

                        updated
                          .find(p=>p._id===patient._id)
                          .organs[index]
                          .status = e.target.value

                        setPatients(updated)

                      }}
                    >

                      <option value="available">Available</option>
                      <option value="transplanted">Transplanted</option>

                    </select>

                  </td>

                  <td>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={()=>updateOrgan(patient._id,index,organ)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={()=>removeOrgan(patient._id,index)}
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>



          {/* Add Organ Section */}

          <div className="row mt-3">

            <div className="col-md-4">

              <select
                className="form-control"
                value={newOrgan[patient._id] || ""}
                onChange={(e)=>setNewOrgan({
                  ...newOrgan,
                  [patient._id]:e.target.value
                })}
              >

                <option value="">Select Organ</option>

                {organsList.map(o=>(
                  <option key={o}>{o}</option>
                ))}

              </select>

            </div>


            <div className="col-md-4">

              <input
                type="number"
                placeholder="Count"
                className="form-control"
                value={newCount[patient._id] || ""}
                onChange={(e)=>setNewCount({
                  ...newCount,
                  [patient._id]:e.target.value
                })}
              />

            </div>


            <div className="col-md-4">

              <button
                className="btn btn-primary w-100"
                onClick={()=>addOrgan(patient._id)}
              >
                Add Organ for this Patient
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  )

}

export default Profile