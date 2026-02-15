import { createSlice } from "@reduxjs/toolkit";
export const authSlice=createSlice({
    name:"auth",
    initialState:{isloggedIn:false},
    reducers:{
        login(state){
            state.isloggedIn=true
        },
        logout(state){
            state.isloggedIn=false
        }
    }
    
})
const authActions=authSlice.actions
export default authActions