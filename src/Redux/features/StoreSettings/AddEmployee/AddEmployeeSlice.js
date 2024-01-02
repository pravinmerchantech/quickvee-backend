import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, DELETE_EMPLOYEE, EMPLOYEE_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    employeelistData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchEmployeeListsData = createAsyncThunk('employeelist/fetchEmployeeListsData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + EMPLOYEE_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.status === 200) {
           return response.data.result
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

export const deleteEmployee = createAsyncThunk('employeeList/deleteEmployee',async(data) => {
    try{
        const response = await axios.post(BASE_URL + DELETE_EMPLOYEE , data , { headers:{"Content-Type":"multipart/form-data"} })
       console.log(response)
        if(response.data.status === true){
            const mydata = {
                employee_id:data.employee_id,
                message:response.data.message
            }
            return mydata
        }
    }catch(error) {
        throw new Error(error.response.data.message);
    }
})


const AddEmployeeSlice = createSlice({
    name: 'employeelist',
    initialState,
    reducers: {
        editEmployee: (state, action) => {
            state.employeelistData = state.employeelistData.map(employee => {
                if (employee.id === action.payload.id) {

                    return {
                        ...employee, // Spread syntax to copy existing properties
                        title: action.payload.title, // Update the title
                        old_title: action.payload.title
                    };
                } else {
                    // This isn't the one we're looking for - leave it as is
                    return employee;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeeListsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchEmployeeListsData.fulfilled, (state, action) => {
            state.loading = false;
            state.employeelistData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchEmployeeListsData.rejected, (state, action) => {
            state.loading = false;
            state.employeelistData = {};
            state.error = action.error.message;
        })

        builder.addCase(deleteEmployee.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.employeelistData = state.employeelistData.filter((item) => item && item.id !== action.payload.employee_id);

            state.error = ''; // Reset the error message
        });
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

      

    }
})

export const {  editEmployee} = AddEmployeeSlice.actions;
export default AddEmployeeSlice.reducer