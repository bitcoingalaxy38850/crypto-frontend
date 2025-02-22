import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "./features/UserSlice.jsx"
import MachineReducer from "./features/Machine_Slice.jsx"
import AdminReducer from "./features/AdminSlice.jsx"


export default configureStore({
  reducer: {
    user:UserReducer,
    machine:MachineReducer,
    admin:AdminReducer


  }
})