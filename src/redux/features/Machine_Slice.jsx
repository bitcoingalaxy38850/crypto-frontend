import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   machines:null
};

const MachineSlice = createSlice({
    name: "machine",
    initialState,
    reducers: {
        addMachines: (state, action) => {
            state.machines = action.payload;
            
        },
  
    }
});


export default MachineSlice.reducer;

export const  {addMachines} = MachineSlice.actions;
