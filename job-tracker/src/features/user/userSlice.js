import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    user: null
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
    console.log(`Register user: ${user}`);
});

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
    console.log(`Login user: ${user}`);
});


const userSlice = createSlice({
    name: 'user',
    initialState,
});

export default userSlice.reducer;