import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
    loading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage()
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
    try {
        const response = await customFetch.post('/auth/register', user);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Register failed');
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
    try {
        const response = await customFetch.post('/auth/login', user);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Login failed');
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello, ${user.name}`);
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            console.log('isloading');
          })
          .addCase(loginUser.fulfilled, (state, { payload }) => {
            console.log(payload);
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`);
          })
          .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            console.log('err');
            toast.error(payload);
          })
      },
});

export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer;