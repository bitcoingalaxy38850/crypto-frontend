import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   admin:{
    pending_deposit:null,
    pending_withdrawal:null,
    approved_deposit:null,
    approved_withdrawal:null
   }
};

const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        addPendingDeposit: (state, action) => {
            state.admin.pending_deposit = action.payload;
            
        },
        addApprovedDeposit: (state, action) => {
            state.admin.approved_deposit = action.payload;
            
        },
        addPendingWithdrawal: (state, action) => {
            state.admin.pending_withdrawal = action.payload;
            
        },
        addApprovedWithDrawal: (state, action) => {
            state.admin.approved_withdrawal = action.payload;
            
        },
  
    }
});


export default AdminSlice.reducer;

export const  {addApprovedDeposit , addApprovedWithDrawal , addPendingWithdrawal  ,addPendingDeposit} = AdminSlice.actions;
