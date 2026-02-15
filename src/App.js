
import './App.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import CreateUser from './components/createUser/CreateUser'
import UserList from './components/userList/UserList'
import RootLayout from './RootLayout';
import { useState } from 'react';

function App() {
   let [state,setState]=useState(0)
//   let [user,setUser]=useState("")
// onAuthStateChanged(auth,(currentUser)=>{
//   setUser(currentUser);
// })
// let change=(data)=>{
//   setCount(data);
// }
let loginstate=(ans)=>
{
  setState(ans);
}
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout  />,
      children:[
       {
        path:"/",
        element:<Home />
       },
       {
        path:"/login",
        element: <Login  />
       },
       {
        path:"/register",
        element:<Register />
       },
       {
        path:"/createUser",
        element:<CreateUser />
       },
       {
        path:"/userList",
        element:<UserList />
       }
      ]
    }
  ])
  return (
    <div className="App">
   
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
