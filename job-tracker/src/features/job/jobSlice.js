import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk('job/create-job', async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (err) {
    if (err.response.status === 401){
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized. Logging out...');
  }
  return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Updating failed');
  }
})

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
      handleChange: (state, {payload: {name, value}}) => {
        state[name] = value;
      },
      clearValues: () => {
        return initialState;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createJob.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createJob.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          toast.success(`Job created`);
        })
        .addCase(createJob.rejected, (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        })}
});
export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;