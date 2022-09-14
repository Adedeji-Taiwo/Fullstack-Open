import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return state;
        },
        hideNotification(state, action) {
            state = initialState
            return state;
        }
    }
})

export const { setNotification, hideNotification } = notificationSlice.actions;



// async action creator
let timerId;

export const notificationChange = (notificationMsg, delay) => {

    return (dispatch) => {
        clearTimeout(timerId);

        dispatch(setNotification(notificationMsg));

        timerId = setTimeout(() => dispatch(hideNotification()), delay)

    }
}

export default notificationSlice.reducer;



