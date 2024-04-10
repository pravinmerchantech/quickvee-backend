
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, EMPLOYEE_WORK_HOURS} from '../../../../Constants/Config';


const initialState = {
    loading: false,
    employeewrkhrstData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchemployeewrkhrs = createAsyncThunk('EmployeeWorkinghrsSlice/fetchemployeewrkhrs.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + EMPLOYEE_WORK_HOURS, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response?.data?.status === true) {
            return response?.data?.report_data
        }else{
            return response?.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type





const EmployeeWorkinghrsSlice = createSlice({
    name: 'EmployeeWorkinghrsSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchemployeewrkhrs.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchemployeewrkhrs.fulfilled, (state, action) => {
            state.loading = false;
            state.employeewrkhrstData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchemployeewrkhrs.rejected, (state, action) => {
            state.loading = false;
            state.employeewrkhrstData = {};
            state.error = action.error.message;
        })

    }
})


export default EmployeeWorkinghrsSlice.reducer