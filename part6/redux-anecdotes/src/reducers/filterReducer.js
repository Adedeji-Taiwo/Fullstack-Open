import { createSlice } from '@reduxjs/toolkit';



const initialState = '';

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
       setFilter(state, action) {
        const filter = action.payload;
        return state = filter
       }


    }
})


export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;