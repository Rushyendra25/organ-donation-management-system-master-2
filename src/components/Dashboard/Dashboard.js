import { useEffect, useState } from "react"
import axios from "axios"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

function Dashboard(){

  const username = localStorage.getItem("username")

  const [data,setData] = useState([])

  const COLORS = ["#ff6384","#36a2eb","#ffcd56","#4bc0c0","#9966ff"]

  useEffect(()=>{

    axios.get(`http://localhost:4000/user-api/dashboard/${username}`)
    .then(res=>{
      setData(res.data)
    })

  },[])


  const totalOrgans = data.reduce((sum,d)=>sum+d.count,0)

  return(

    <div className="container mt-4">

      <h3 className="text-center mb-4">
        Hospital Organ Dashboard
      </h3>


      {/* total organs */}

      <div className="card text-center p-3 mb-4">

        <h4>Total Organs Available</h4>

        <h2>{totalOrgans}</h2>

      </div>


      {/* chart */}

      <div className="card p-3">

        <h5 className="text-center mb-3">
          Organ Distribution
        </h5>

        <ResponsiveContainer width="100%" height={350}>

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="organ"
              outerRadius={120}
              label
            >

              {data.map((entry,index)=>(
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

export default Dashboard