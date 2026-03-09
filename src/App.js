
import './App.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import CreateUser from './components/createUser/CreateUser'
import UserList from './components/userList/UserList'
import RootLayout from './RootLayout';
import { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import authActions from "./store/authslice";
import Profile from './components/Profile/Profile';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
   let [state,setState]=useState(0)
//   let [user,setUser]=useState("")
// onAuthStateChanged(auth,(currentUser)=>{
//   setUser(currentUser);
// })
// let change=(data)=>{
//   setCount(data);
// }
const dispatch = useDispatch();

 useEffect(() => {

   const token = localStorage.getItem("token");

   if (token) {
     dispatch(authActions.login());
   }

 }, []);
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
       },
       {
        path:"/profile",
        element:<Profile />
       },
       {
        path:"/dashboard",
        element:<Dashboard />
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
