import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', async (_, thunkAPI) => {
    let url = `/jobs`;

    try {
        const response = await customFetch.get(url, {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const AllJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    extraReducers: (builder) => {
    builder
    .addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllJobs.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    })
    .addCase(getAllJobs.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    })}
});

export default AllJobsSlice.reducer;