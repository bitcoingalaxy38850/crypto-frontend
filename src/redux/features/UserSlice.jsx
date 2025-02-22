import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    isLoggedIn: false ,
    userPendingDeposit:null
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        removeUser: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
        },
        addUserPendingDeposit:(state , action)=>{
            state.userPendingDeposit = action.payload;

        },
        updateUserInfo: (state, action) => {
            state.userInfo = {
              ...state.userInfo,
              ...action.payload, // Merge updated fields with existing user data
            };
        }
  
    }
});


export default UserSlice.reducer;

export const  {addUser , removeUser , addUserPendingDeposit , updateUserInfo} = UserSlice.actions;
