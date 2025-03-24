import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialState = {
    loading: false,
    user: null
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
    try {
        const response = await customFetch.post('/auth/register', user);
        return response.data;
    } catch (err) {
        thunkAPI.rejectWithValue(err.response.data.msg)
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
    console.log(`Login user: ${user}`);
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            toast.success(`Hello There ${user.name}`);
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
      },
});

export default userSlice.reducer;