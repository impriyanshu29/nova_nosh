import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error:null,
    loading:false,
    isVerifed:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart :(state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },

    }
})

export const {signInStart,signInSuccess,signInFail} = userSlice.actions;

export default userSlice.reducer;

